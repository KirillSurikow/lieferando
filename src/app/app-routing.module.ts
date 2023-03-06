import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantConditionComponent } from './restaurant-condition/restaurant-condition.component';
import { RestaurantDescriptionComponent } from './restaurant-description/restaurant-description.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
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
        path: '',
        component: RestaurantDescriptionComponent
      },
      {
        path: 'restaurantCondition',
        component: RestaurantConditionComponent
      },
      {
        path: 'restaurantMenu',
        component: RestaurantMenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
