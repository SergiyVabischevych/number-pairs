import { CardStatus } from './card-status.emun';

export interface NumberCardModel {
  id: number;
  value: number;
  casing: string;
  status: CardStatus;
}
