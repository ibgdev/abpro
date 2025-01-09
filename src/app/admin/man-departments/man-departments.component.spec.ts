import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDepartmentsComponent } from './man-departments.component';

describe('ManDepartmentsComponent', () => {
  let component: ManDepartmentsComponent;
  let fixture: ComponentFixture<ManDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManDepartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
