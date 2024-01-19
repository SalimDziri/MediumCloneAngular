import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'profile/:user', component: ProfileComponent},
    {path: '**', redirectTo: ''},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomeRoutingModule { }