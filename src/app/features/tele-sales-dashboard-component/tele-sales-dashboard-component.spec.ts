import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleSalesDashboardComponent } from './tele-sales-dashboard-component';

describe('TeleSalesDashboardComponent', () => {
  let component: TeleSalesDashboardComponent;
  let fixture: ComponentFixture<TeleSalesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeleSalesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeleSalesDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
