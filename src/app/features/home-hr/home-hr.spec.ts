import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHr } from './home-hr';

describe('HomeHr', () => {
  let component: HomeHr;
  let fixture: ComponentFixture<HomeHr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
