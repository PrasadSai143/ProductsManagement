import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AuthGuard } from './gaurds/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: '', redirectTo: '/home', pathMatch: 'full'
},
{
  path:'home', component: HomeComponent
},
{
  path: 'product/productlist', component: ProductListComponent, canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
