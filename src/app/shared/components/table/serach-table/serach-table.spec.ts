import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachTable } from './serach-table';

describe('SerachTable', () => {
  let component: SerachTable;
  let fixture: ComponentFixture<SerachTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerachTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerachTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
