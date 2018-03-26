import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPageCurrentTagInfoComponent } from './posts-page-current-tag-info.component';

describe('PostsPageCurrentTagInfoComponent', () => {
  let component: PostsPageCurrentTagInfoComponent;
  let fixture: ComponentFixture<PostsPageCurrentTagInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsPageCurrentTagInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPageCurrentTagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
