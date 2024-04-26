import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinePassComponent } from './redefine-pass.component';

describe('RedefinePassComponent', () => {
  let component: RedefinePassComponent;
  let fixture: ComponentFixture<RedefinePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedefinePassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedefinePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
