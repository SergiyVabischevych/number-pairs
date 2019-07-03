import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom, filter, debounceTime } from 'rxjs/operators';

import * as fromAppActions from '@app.store/actions/app.actions';
import * as fromReducers from '@app.store/index';
import { NumberCardModel, CardStatus } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

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
