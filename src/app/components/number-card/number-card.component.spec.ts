import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCardComponent } from './number-card.component';
import { CardStatus, NumberCardModel } from '@app/models';
import { Component } from '@angular/core';

@Component({
  template: `<sv-number-card
              [numberCard]="numberCard"
              (openCard)=onOpenCard($event)
            ></sv-number-card>`
})
class NumberCardParentComponent {
  openCardId: number;
  numberCard: NumberCardModel;

  onOpenCard(id: number): void {
    this.openCardId = id;
  }
}

describe('NumberCardComponent', () => {
  let hostComponent: NumberCardParentComponent;
  let numberCardEl: HTMLElement;
  let fixture: ComponentFixture<NumberCardParentComponent>;
  const numberCard: NumberCardModel = {
    id: 1,
    value: 35,
    status: CardStatus.Close,
    casing: '#',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NumberCardComponent,
        NumberCardParentComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberCardParentComponent);
    numberCardEl = fixture.debugElement.nativeElement.querySelector('.number-card');
    hostComponent = fixture.componentInstance;
    hostComponent.numberCard = { ...numberCard };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should show #', () => {
    expect(numberCardEl.textContent.trim()).toBe('#');
  });

  it('should show 35', () => {
    hostComponent.numberCard = { ...numberCard, status: CardStatus.Show };
    fixture.detectChanges();
    expect(numberCardEl.textContent.trim()).toBe('35');
  });

  it('should has background-color "rgb(230, 81, 0)"', () => {
    hostComponent.numberCard = { ...numberCard, status: CardStatus.Show };
    fixture.detectChanges();
    expect(numberCardEl.textContent.trim()).toBe('35');
    expect(window.getComputedStyle(numberCardEl, null).getPropertyValue('background-color')).toBe('rgb(230, 81, 0)');
  });

  it('should has background-color "#0099FF"', () => {
    hostComponent.numberCard = { ...numberCard, status: CardStatus.Open };
    fixture.detectChanges();
    expect(numberCardEl.textContent.trim()).toBe('35');
    expect(window.getComputedStyle(numberCardEl, null).getPropertyValue('background-color')).toBe('rgb(0, 153, 255)');
  });

  it('should raise selected event when clicked', () => {
    numberCardEl.click();
    expect(hostComponent.openCardId).toBe(numberCard.id);
  });
});
