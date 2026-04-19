import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCard } from './loader-card';

describe('LoaderCard', () => {
  let component: LoaderCard;
  let fixture: ComponentFixture<LoaderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
