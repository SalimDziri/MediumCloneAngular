import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects } from './home-api.effects';
import { EffectsModule } from '@ngrx/effects';
import { ArticleComponent } from './components/article/article.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ArticleComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    EffectsModule.forFeature([HomeEffects])

  ]
})
export class HomeModule { }
