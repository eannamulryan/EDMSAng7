import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectReportComponent } from './suspect-report.component';

describe('SuspectReportComponent', () => {
  let component: SuspectReportComponent;
  let fixture: ComponentFixture<SuspectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
