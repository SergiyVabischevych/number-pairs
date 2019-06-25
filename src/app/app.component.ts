import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromReducers from '@app.store/index';
import * as fromAppActions from '@app.store/actions/app.actions';
import { NumberCardModel } from './models';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  pairs$: Observable<Array<NumberCardModel>> = this.store.pipe(select(fromReducers.getNumberPairs));

  constructor(
    private readonly store: Store<fromReducers.State>,
  ) {
    // here dispatch action for init number pairs
    store.dispatch(new fromAppActions.InitNumberPairsAction());
  }

  trackById(index: number, item: NumberCardModel): number {
    return item.id;
  }

  onOpenCard(cardId: number): void {
    this.store.dispatch(new fromAppActions.SetShowedCardAction({ cardId }));
  }
}
