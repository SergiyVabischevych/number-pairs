import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import * as fromReducers from '@app.store/index';
import * as fromAppActions from '@app.store/actions/app.actions';
import { AppComponent } from './app.component';
import { NumberCardComponent } from './components';
import { NumberCardModel } from './models';
import { DataGenerationUtils } from './utils';

describe('AppComponent', () => {
  const MATRIX_SIZE = 6;
  const MIN_NUMBER_VALUE = 1;
  const MAX_NUMBER_VALUE = 99;
  let store: MockStore<fromReducers.State>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const pairs: Array<NumberCardModel> = DataGenerationUtils.getNumberCards(
    DataGenerationUtils.getRandomNumbers(MIN_NUMBER_VALUE, MATRIX_SIZE * MATRIX_SIZE, MATRIX_SIZE * MATRIX_SIZE),
    DataGenerationUtils.getRandomNumbers(MIN_NUMBER_VALUE, MAX_NUMBER_VALUE, MATRIX_SIZE * MATRIX_SIZE / 2),
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NumberCardComponent,
      ],
      imports: [
        StoreModule.forRoot({ ...fromReducers.appReducers })
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of items after the data is loaded', () => {
    component.pairs$.subscribe((items: Array<NumberCardModel>) => {
      expect(items.length).toBe(pairs.length);
    });
  });

  it('should display a card value after executed "onOpenCard"', () => {
    const index = 12;
    const card: NumberCardModel = pairs[index];

    store.dispatch(new fromAppActions.SetNumberPairsAction({ pairs }));
    component.onOpenCard(card.id);

    component.pairs$.subscribe((items: Array<NumberCardModel>) => {
      expect(items[index]).toEqual(card);
    });
  });
});
