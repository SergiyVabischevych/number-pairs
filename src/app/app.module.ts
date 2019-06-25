import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appReducers } from '@app.store/index';
import { AppEffects } from '@app.store/effects';
import { AppComponent } from './app.component';
import { NumberCardComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    NumberCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ AppEffects ]),
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  exports: [NumberCardComponent]
})
export class AppModule { }
