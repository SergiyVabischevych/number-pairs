import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { NumberCardComponent } from './components';
import { State } from '@app.store/index';

describe('AppComponent', () => {
  let store: MockStore<{ State }>;
  const initialState: State = {
    app: {
      numberPairs: []
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NumberCardComponent,
      ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
