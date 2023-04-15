import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeHomeComponent } from './backoffice-home/backoffice-home.component';
import { MyRestaurantsComponent } from './my-restaurants/my-restaurants.component';
import { RegistrationComponent } from './registration/registration.component';
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
    path: 'restaurant/:id',
    component: RestaurantComponent,

  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'backoffice/:id',
    component: BackofficeHomeComponent,
    children: [
      {
        path: '',
        component: MyRestaurantsComponent
      },
      {
        path: 'characteristics',
        component: RestaurantDescriptionComponent
      },
      {
        path: 'restaurantCondition',
        component: RestaurantConditionComponent
      },
      {
        path: 'restaurantMenu',
        component: RestaurantMenuComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
