import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import {MatMenuModule} from '@angular/material/menu';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { HttpClientModule } from '@angular/common/http';
import { Restaurants } from 'src/models/restaurants.class';
import {MatCardModule} from '@angular/material/card';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RatingAndAmountComponent } from './rating-and-amount/rating-and-amount.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { ScrollTopButtonComponent } from './scroll-top-button/scroll-top-button.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantDescriptionComponent } from './restaurant-description/restaurant-description.component';
import { RestaurantConditionComponent } from './restaurant-condition/restaurant-condition.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { DataService } from './services/data.service';


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
    CreateRestaurantComponent,
    RestaurantDescriptionComponent,
    RestaurantConditionComponent,
    RestaurantMenuComponent
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  
  ],

  providers: [
    Restaurants,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
