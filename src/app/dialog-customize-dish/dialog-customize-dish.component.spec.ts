import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomizeDishComponent } from './dialog-customize-dish.component';

describe('DialogCustomizeDishComponent', () => {
  let component: DialogCustomizeDishComponent;
  let fixture: ComponentFixture<DialogCustomizeDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCustomizeDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCustomizeDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
