import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCompComponent } from './home-comp/home-comp.component';
import { TrainModelComponent } from './train-model/train-model.component';


const routes: Routes = [
  {
    path: '',
    component: HomeCompComponent,
    pathMatch: 'full'
  },
  {
    path: 'Train-Model',
    component: TrainModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
