import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantDescriptionComponent } from './restaurant-description/restaurant-description.component';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantOverviewComponent,

  },
  {
    path: 'restaurant',
    component: RestaurantComponent,

  },
  {
    path: 'createRestaurant',
    component: CreateRestaurantComponent,
    children: [
      {
        path: 'createRestaurant',
        component: RestaurantDescriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
