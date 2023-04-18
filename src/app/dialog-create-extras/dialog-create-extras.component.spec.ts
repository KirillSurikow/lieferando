import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateExtrasComponent } from './dialog-create-extras.component';

describe('DialogCreateExtrasComponent', () => {
  let component: DialogCreateExtrasComponent;
  let fixture: ComponentFixture<DialogCreateExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateExtrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
