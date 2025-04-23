import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfinanceComponent } from './adminfinance.component';

describe('AdminfinanceComponent', () => {
  let component: AdminfinanceComponent;
  let fixture: ComponentFixture<AdminfinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminfinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
