import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom, filter, debounceTime } from 'rxjs/operators';

import * as fromAppActions from '@app.store/actions/app.actions';
import * as fromReducers from '@app.store/index';
import { NumberCardModel, CardStatus } from '@app/models';

const MATRIX_SIZE = 6;
const MIN_NUMBER_VALUE = 1;
const MAX_NUMBER_VALUE = 99;

function getRandomIntInclusive(min: number, max: number): number {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
}

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

  @Effect()
  initNumberPairs$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAppActions.AppActionTypes.InitNumberPairs),
      map(() => {
        const randomNumbers: Set<number> = new Set();
        const randomNumberValues: Set<number> = new Set();
        while (randomNumberValues.size < MATRIX_SIZE * MATRIX_SIZE / 2) {
          // fill card's values
          randomNumberValues.add(getRandomIntInclusive(MIN_NUMBER_VALUE, MAX_NUMBER_VALUE));
        }
        while (randomNumbers.size < MATRIX_SIZE * MATRIX_SIZE) {
          // fill card's ids
          randomNumbers.add(getRandomIntInclusive(1, MATRIX_SIZE * MATRIX_SIZE));
        }
        return [ randomNumbers, randomNumberValues ];
      }),
      map(([ pairsSet, pairsSetValues ]: [ Set<number>, Set<number> ]) => {
        const pairs: Array<NumberCardModel> = [ ...pairsSetValues, ...pairsSetValues ]
          // make card object and fill default values
          .map((value: number, index: number) => ({
            value,
            status: CardStatus.Close,
            casing: '#',
            id: [ ...pairsSet ][ index ]
          }))
          // sort by id
          .sort((item1: NumberCardModel, item2: NumberCardModel) => {
            if (item1.id < item2.id) {
              return -1;
            }
            if (item1.id > item2.id) {
              return 1;
            }
            return 0;
          });
        return new fromAppActions.SetNumberPairsAction({ pairs });
      })
    );

  @Effect()
  changeCardStatus$: Observable<Action> = this.actions$
    .pipe(
      ofType<fromAppActions.CompareNumberPairsAction>(fromAppActions.AppActionTypes.CompareShowedCards),
      map(action => action.payload.pairs),
      filter((pairs: Array<NumberCardModel>) => pairs.filter(
          (item: NumberCardModel) => item.status === CardStatus.Show
        ).length === 2
      ),
      tap((pairs: Array<NumberCardModel>) => {
        this.store.dispatch(new fromAppActions.SetNumberPairsAction({ pairs }));
      }),
      map((pairs: Array<NumberCardModel>) => {
        const showedCard: Array<NumberCardModel> = pairs
          .filter((item: NumberCardModel) => item.status === CardStatus.Show);
        const isEqual: boolean = showedCard[0].value === showedCard[1].value;
        return pairs.map((item: NumberCardModel) => {
          if ( item.status === CardStatus.Show) {
            return { ...item, status: isEqual ? CardStatus.Open : CardStatus.Close };
          }
          return item;
        });
      }),
      debounceTime(500),
      map((pairs: Array<NumberCardModel>) => new fromAppActions.SetNumberPairsAction({ pairs })),
    );

  @Effect()
  changeCardStatus1$: Observable<Action> = this.actions$
    .pipe(
      ofType<fromAppActions.CompareNumberPairsAction>(fromAppActions.AppActionTypes.CompareShowedCards),
      map(action => action.payload.pairs),
      filter((pairs: Array<NumberCardModel>) => pairs.filter((item: NumberCardModel) => item.status === CardStatus.Show).length < 2),
      map((pairs: Array<NumberCardModel>) => new fromAppActions.SetNumberPairsAction({ pairs })),
    );

  @Effect()
  setCardStatus$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAppActions.AppActionTypes.SetShowedCard),
      map((action: fromAppActions.SetShowedCardAction) => action.payload.cardId),
      withLatestFrom(this.store.pipe(select(fromReducers.getNumberPairs))),
      map(([ id, cards]: [ number, Array<NumberCardModel> ]) => {
        return new fromAppActions.CompareNumberPairsAction({
          pairs: cards.map((item: NumberCardModel) => {
            return item.id === id && item.status === CardStatus.Close
            ? { ...item, status: CardStatus.Show }
            : item;
          })
        });
      })
    );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<fromReducers.State>,
  ) {}

}