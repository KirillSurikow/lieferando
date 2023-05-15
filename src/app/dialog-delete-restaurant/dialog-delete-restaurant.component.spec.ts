import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRestaurantComponent } from './dialog-delete-restaurant.component';

describe('DialogDeleteRestaurantComponent', () => {
  let component: DialogDeleteRestaurantComponent;
  let fixture: ComponentFixture<DialogDeleteRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
