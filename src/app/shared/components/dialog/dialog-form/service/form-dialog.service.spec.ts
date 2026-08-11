import { TestBed } from '@angular/core/testing';

import { FormDailogService } from './form-dialog.service';

describe('ModalService', () => {
  let service: FormDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
