import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from './mats.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './services/home.service';
import { LineBreaksPipe } from './pipes/lineBreak.pipe';
import { SplitTagPipe } from './pipes/splitTags.pipe';
import { LoadingArticleComponent } from './components/loading-article/loading-article.component';
import { TimeAgoPipe } from './pipes/timesAgo.pipe';
import { LoadingTagsComponent } from './components/loading-tags/loading-tags.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ArticleService } from './services/article.service';
import { ProfileService } from './services/profile.service';
import { LoadingArticleDetailsComponent } from './components/loading-article-details/loading-article-details.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingArticleComponent,
    LoadingTagsComponent,
    LineBreaksPipe,
    SplitTagPipe,
    TimeAgoPipe,
    ShortenPipe,
    LoadingArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports:[
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    LoadingArticleComponent,
    LoadingTagsComponent,
    LoadingArticleDetailsComponent,
    AngularMaterialsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LineBreaksPipe,
    SplitTagPipe,
    TimeAgoPipe,
    ShortenPipe
  ],
  providers:[
    AuthService,
    HomeService,
    ArticleService,
    ProfileService
  ]
})
export class SharedModule { }
