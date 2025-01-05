import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: SignInComponent},
    { path: 'sign-up/:profileType', component: SignUpComponent},
    { path: 'add-user', component: AddUserComponent},
    { path: 'home', component: HomeComponent},

];
