import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDishComponent } from './dialog-edit-dish.component';

describe('DialogEditDishComponent', () => {
  let component: DialogEditDishComponent;
  let fixture: ComponentFixture<DialogEditDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
