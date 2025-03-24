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
import { ProductComponent } from './components/product/product.component';
import { StockComponent } from './components/stock/stock.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ViewLayoutComponent } from './components/view-layout/view-layout.component';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';
import { ProductCategoryComponent } from './admin/product-category/product-category.component';

export const routes: Routes = [
  {
    path: 'api/v1',
    component: ViewLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route for 'api'
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'contact-us', component: ContactComponent, title: 'Contact Us' },
      { path: 'about-us', component: AboutusComponent, title: 'About Us' },
      { path: 'stock', component: StockComponent, title: 'Stock' },
      {path:'shop-by-category',component:ShopByCategoryComponent,title: 'shop-by-category'}
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent, // Parent layout for admin
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route for 'admin'
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'users', component: ManageUserComponent, canActivate: [authGuard] },
      { path: 'posts', component: ManagePostComponent, canActivate: [authGuard] },
      { path: 'postcategory', component: PostcategoryComponent, canActivate: [authGuard] },
      { path: 'product', component: ProductComponent, canActivate: [authGuard] },
      { path: 'product-category', component: ProductCategoryComponent, canActivate: [authGuard] },

    ],
  },
  { path: '**', redirectTo: 'api/v1/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}