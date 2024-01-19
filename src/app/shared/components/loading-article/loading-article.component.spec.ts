import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingArticleComponent } from './loading-article.component';

describe('LoadingArticleComponent', () => {
  let component: LoadingArticleComponent;
  let fixture: ComponentFixture<LoadingArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
