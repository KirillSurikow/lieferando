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




@NgModule({
  declarations: [
    AppComponent,
    RestaurantOverviewComponent,
    DialogLoginComponent,
    RatingAndAmountComponent,
    RestaurantListComponent,
    SearchComponent
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
  
  ],

  providers: [
    Restaurants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
