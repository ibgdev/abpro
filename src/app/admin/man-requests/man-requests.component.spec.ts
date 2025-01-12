import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManRequestsComponent } from './man-requests.component';

describe('ManRequestsComponent', () => {
  let component: ManRequestsComponent;
  let fixture: ComponentFixture<ManRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
