import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSpacer } from './table-spacer';

describe('TableSpacer', () => {
  let component: TableSpacer;
  let fixture: ComponentFixture<TableSpacer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSpacer],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSpacer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
