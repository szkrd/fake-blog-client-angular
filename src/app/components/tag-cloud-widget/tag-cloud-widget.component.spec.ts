import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudWidgetComponent } from './tag-cloud-widget.component';

describe('TagCloudWidgetComponent', () => {
  let component: TagCloudWidgetComponent;
  let fixture: ComponentFixture<TagCloudWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCloudWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
