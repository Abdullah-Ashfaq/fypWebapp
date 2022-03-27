import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCompComponent } from './home-comp/home-comp.component';
import { TrainModelComponent } from './train-model/train-model.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCompComponent,
    TrainModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
