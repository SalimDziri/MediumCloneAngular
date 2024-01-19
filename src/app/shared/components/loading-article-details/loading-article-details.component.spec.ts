import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingArticleDetailsComponent } from './loading-article-details.component';

describe('LoadingArticleDetailsComponent', () => {
  let component: LoadingArticleDetailsComponent;
  let fixture: ComponentFixture<LoadingArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingArticleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
