import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewArticleRoutingModule } from './new-article-routing.module';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialsModule } from '../shared/mats.module';


@NgModule({
  declarations: [
    NewArticleComponent
  ],
  imports: [
    CommonModule,
    NewArticleRoutingModule,
    SharedModule,
    AngularMaterialsModule
  ]
})
export class NewArticleModule { }
