import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFollowComponent } from './report-follow.component';

describe('ReportFollowComponent', () => {
  let component: ReportFollowComponent;
  let fixture: ComponentFixture<ReportFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFollowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
