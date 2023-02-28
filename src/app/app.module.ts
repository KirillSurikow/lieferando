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



@NgModule({
  declarations: [
    AppComponent,
    RestaurantOverviewComponent,
    DialogLoginComponent
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
    NgbRatingModule
  ],

  providers: [
    Restaurants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
