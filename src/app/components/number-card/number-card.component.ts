import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NumberCardModel, CardStatus } from '@app/models';

@Component({
  selector: 'sv-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: [ './number-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberCardComponent implements OnChanges {

  displayedValue: string;

  @Input() numberCard: NumberCardModel;

  @Output() openCard: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numberCard) {
      if (this.numberCard.status === CardStatus.Close) {
        this.displayedValue = this.numberCard.casing;
      }
      if (this.numberCard.status !== CardStatus.Close) {
        this.displayedValue = this.numberCard.value.toString();
      }
    }
  }

  onOpenCard(): void {
    this.openCard.emit(this.numberCard.id);
  }
}
