import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';

import * as fromAppActions from '@app.store/actions/app.actions';
import * as fromReducers from '@app.store/index';
import { NumberCardModel, CardStatus } from '@app/models';

const MATRIX_SIZE = 6;
const MIN_NUMBER_VALUE = 1;
const MAX_NUMBER_VALUE = 99;

function getRandomIntInclusive(min_: number, max_: number): number {
  const min = Math.ceil(min_);
  const max = Math.floor(max_);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
          randomNumberValues.add(getRandomIntInclusive(MIN_NUMBER_VALUE, MAX_NUMBER_VALUE));
        }
        while (randomNumbers.size < MATRIX_SIZE * MATRIX_SIZE) {
          randomNumbers.add(getRandomIntInclusive(1, MATRIX_SIZE * MATRIX_SIZE));
        }
        return [ randomNumbers, randomNumberValues ];
      }),
      map(([ pairsSet, pairsSetValues ]: [ Set<number>, Set<number> ]) => {
        const pairs: Array<NumberCardModel> = [ ...pairsSetValues, ...pairsSetValues ]
          .map((value: number, index: number) => ({
            value,
            status: CardStatus.Close,
            casing: '#',
            id: [ ...pairsSet ][ index ]
          }))
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
      tap(action => console.log(action)),
      map(action => new fromAppActions.SetNumberPairsAction({ pairs: action.payload.pairs }))
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
