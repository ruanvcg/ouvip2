import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCompletedListComponent } from './report-completed-list.component';

describe('ReportCompletedListComponent', () => {
  let component: ReportCompletedListComponent;
  let fixture: ComponentFixture<ReportCompletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCompletedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
