import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookDetailsComponent } from './appointment-book-details.component';

describe('AppointmentBookDetailsComponent', () => {
  let component: AppointmentBookDetailsComponent;
  let fixture: ComponentFixture<AppointmentBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
