import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDescriptionComponent } from './restaurant-description.component';

describe('RestaurantDescriptionComponent', () => {
  let component: RestaurantDescriptionComponent;
  let fixture: ComponentFixture<RestaurantDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
