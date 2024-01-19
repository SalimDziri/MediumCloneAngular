import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './article-api.effects';
import { CommentComponent } from './components/comment/comment.component';


@NgModule({
  declarations: [
    ArticleDetailsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class ArticlesModule { }
