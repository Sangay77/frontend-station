import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { authGuard } from './guard/auth.guard';
import { ManagePostComponent } from './admin/manage-post/manage-post.component';
import { PostcategoryComponent } from './admin/postcategory/postcategory.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'contact-us', component: ContactComponent, title: 'Contact Us' },
  {
    path: 'admin',
    component: AdminLayoutComponent, // Parent layout
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'users', component: ManageUserComponent, canActivate: [authGuard] },
      { path: 'posts', component: ManagePostComponent, canActivate: [authGuard] },
      { path: 'postcategory', component: PostcategoryComponent, canActivate: [authGuard] },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}