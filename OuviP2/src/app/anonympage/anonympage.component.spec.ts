import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonympageComponent } from './anonympage.component';

describe('AnonympageComponent', () => {
  let component: AnonympageComponent;
  let fixture: ComponentFixture<AnonympageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonympageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonympageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
