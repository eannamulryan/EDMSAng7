import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectsListComponent } from './suspects-list.component';

describe('SuspectsListComponent', () => {
  let component: SuspectsListComponent;
  let fixture: ComponentFixture<SuspectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
