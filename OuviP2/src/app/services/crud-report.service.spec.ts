import { TestBed } from '@angular/core/testing';

import { CrudReportService } from './crud-report.service';

describe('CrudReportService', () => {
  let service: CrudReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
