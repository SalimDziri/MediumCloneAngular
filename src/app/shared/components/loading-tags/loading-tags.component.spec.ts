import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTagsComponent } from './loading-tags.component';

describe('LoadingTagsComponent', () => {
  let component: LoadingTagsComponent;
  let fixture: ComponentFixture<LoadingTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
