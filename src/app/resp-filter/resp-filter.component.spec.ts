import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespFilterComponent } from './resp-filter.component';

describe('RespFilterComponent', () => {
  let component: RespFilterComponent;
  let fixture: ComponentFixture<RespFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
