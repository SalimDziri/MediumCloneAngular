import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewArticleComponent } from './components/new-article/new-article.component';

const routes: Routes = [
  { path:'', component:NewArticleComponent },
  { path:':slug', component:NewArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewArticleRoutingModule { }
