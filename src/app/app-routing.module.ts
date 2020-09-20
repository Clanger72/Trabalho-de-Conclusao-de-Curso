import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { DependentUserComponent } from './dependent-user/dependent-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'home', component: HomeUserComponent},
  {path: 'dependent', component: DependentUserComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'VerifyEmail', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
