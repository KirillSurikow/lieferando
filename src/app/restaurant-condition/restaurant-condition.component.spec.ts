import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantConditionComponent } from './restaurant-condition.component';

describe('RestaurantConditionComponent', () => {
  let component: RestaurantConditionComponent;
  let fixture: ComponentFixture<RestaurantConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
