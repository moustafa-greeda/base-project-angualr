import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderTable } from './loader-table';

describe('LoaderTable', () => {
  let component: LoaderTable;
  let fixture: ComponentFixture<LoaderTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
