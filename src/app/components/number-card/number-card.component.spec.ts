import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCardComponent } from './number-card.component';
import { CardStatus, NumberCardModel } from '@app/models';
import { Component } from '@angular/core';

@Component({
  template: '<sv-number-card [numberCard]="numberCard"></sv-number-card>'
})
class NumberCardParentComponent {
  numberCard: NumberCardModel;
}

describe('NumberCardComponent', () => {
  let component: NumberCardParentComponent;
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
    component = fixture.componentInstance;
    component.numberCard = { ...numberCard };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show #', () => {
    expect(fixture.nativeElement.textContent).toContain('#');
  });

  it('should show 35', () => {
    component.numberCard = { ...numberCard, status: CardStatus.Show };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('35');
  });

  it('should has background-color "rgb(230, 81, 0)"', () => {
    component.numberCard = { ...numberCard, status: CardStatus.Show };
    fixture.detectChanges();
    const cellElement: HTMLElement = fixture.nativeElement.querySelector('div.show');
    expect(fixture.nativeElement.textContent).toContain('35');
    expect(window.getComputedStyle(cellElement, null).getPropertyValue('background-color')).toBe('rgb(230, 81, 0)');
  });

  it('should has background-color "#0099FF"', () => {
    component.numberCard = { ...numberCard, status: CardStatus.Open };
    fixture.detectChanges();
    const cellElement: HTMLElement = fixture.nativeElement.querySelector('div.open');
    expect(fixture.nativeElement.textContent).toContain('35');
    expect(window.getComputedStyle(cellElement, null).getPropertyValue('background-color')).toBe('rgb(0, 153, 255)');
  });
});
