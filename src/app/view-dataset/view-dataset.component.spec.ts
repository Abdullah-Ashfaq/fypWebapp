import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatasetComponent } from './view-dataset.component';

describe('ViewDatasetComponent', () => {
  let component: ViewDatasetComponent;
  let fixture: ComponentFixture<ViewDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
