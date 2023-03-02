import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAndAmountComponent } from './rating-and-amount.component';

describe('RatingAndAmountComponent', () => {
  let component: RatingAndAmountComponent;
  let fixture: ComponentFixture<RatingAndAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingAndAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingAndAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
