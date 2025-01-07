import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManAccountsComponent } from './man-accounts.component';

describe('ManAccountsComponent', () => {
  let component: ManAccountsComponent;
  let fixture: ComponentFixture<ManAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
