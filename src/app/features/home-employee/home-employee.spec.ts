import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmployee } from './home-employee';

describe('HomeEmployee', () => {
  let component: HomeEmployee;
  let fixture: ComponentFixture<HomeEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
