import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManAbsencesComponent } from './man-absences.component';

describe('ManAbsencesComponent', () => {
  let component: ManAbsencesComponent;
  let fixture: ComponentFixture<ManAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManAbsencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
