import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesComponent } from './medical-specialities.component';

describe('MedicalSpecialitiesComponent', () => {
  let component: SpecialitiesComponent;
  let fixture: ComponentFixture<SpecialitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
