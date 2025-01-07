import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPresencesComponent } from './man-presences.component';

describe('ManPresencesComponent', () => {
  let component: ManPresencesComponent;
  let fixture: ComponentFixture<ManPresencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManPresencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManPresencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
