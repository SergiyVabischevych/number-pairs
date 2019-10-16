import { Action } from '@ngrx/store';
import { NumberCardModel } from '@app/models';

export enum AppActionTypes {
  SetNumberPairs = '[App Root] Set Number Pairs',
  SetShowedCard = '[App Root] Set Showed Card',
  CompareShowedCards = '[App Root] Compare Showed Card',
}

export class SetNumberPairsAction implements Action {

  readonly type = AppActionTypes.SetNumberPairs;

  constructor(public payload: { pairs: Array<NumberCardModel> }) {}

}

export class CompareNumberPairsAction implements Action {

  readonly type = AppActionTypes.CompareShowedCards;

  constructor(public payload: { pairs: Array<NumberCardModel> }) {}

}

export class SetShowedCardAction implements Action {

  readonly type = AppActionTypes.SetShowedCard;

  constructor(public payload: { cardId: number }) {}

}

export type AppActions =
    | SetNumberPairsAction
    | SetShowedCardAction
    | CompareNumberPairsAction;
