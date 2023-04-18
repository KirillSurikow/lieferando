import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { HttpClientModule } from '@angular/common/http';
import { Restaurants } from 'src/models/restaurants.class';
import { MatCardModule } from '@angular/material/card';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RatingAndAmountComponent } from './rating-and-amount/rating-and-amount.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { ScrollTopButtonComponent } from './scroll-top-button/scroll-top-button.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { RestaurantDescriptionComponent } from './restaurant-description/restaurant-description.component';
import { RestaurantConditionComponent } from './restaurant-condition/restaurant-condition.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { CurrencyService } from './services/currency.service';
import { AngularFireModule } from '@angular/fire/compat';
import { RegistrationComponent } from './registration/registration.component';
import { BackofficeHomeComponent } from './backoffice-home/backoffice-home.component';
import { MyRestaurantsComponent } from './my-restaurants/my-restaurants.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BasketComponent } from './basket/basket.component';
import { DialogCreateExtrasComponent } from './dialog-create-extras/dialog-create-extras.component';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantOverviewComponent,
    DialogLoginComponent,
    RatingAndAmountComponent,
    RestaurantListComponent,
    SearchComponent,
    ScrollTopButtonComponent,
    RestaurantComponent,
    RestaurantDescriptionComponent,
    RestaurantConditionComponent,
    RestaurantMenuComponent,
    RegistrationComponent,
    BackofficeHomeComponent,
    MyRestaurantsComponent,
    BasketComponent,
    DialogCreateExtrasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    NgbRatingModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],

  providers: [
    Restaurants,
    CurrencyService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
