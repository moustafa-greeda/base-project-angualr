import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForm } from './dialog-form';

describe('FormShell', () => {
  let component: DialogForm;
  let fixture: ComponentFixture<DialogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
