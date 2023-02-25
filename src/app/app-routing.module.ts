import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';

const routes: Routes = [
  {
    path : '',
    component : RestaurantOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
