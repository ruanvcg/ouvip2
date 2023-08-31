import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForwardedListComponent } from './report-forwarded-list.component';

describe('ReportForwardedListComponent', () => {
  let component: ReportForwardedListComponent;
  let fixture: ComponentFixture<ReportForwardedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportForwardedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportForwardedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
