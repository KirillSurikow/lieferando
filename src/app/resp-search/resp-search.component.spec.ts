import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespSearchComponent } from './resp-search.component';

describe('RespSearchComponent', () => {
  let component: RespSearchComponent;
  let fixture: ComponentFixture<RespSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
