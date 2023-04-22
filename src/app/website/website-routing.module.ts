import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard'
import { ExitGuard } from '../guards/exit.guard'

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryModule ),
        data: {
          preload: true
        }
      },
      {
        path: 'cart', component: MycartComponent
      },
      {
        path: 'register', component: RegisterComponent,
        canDeactivate: [ExitGuard]
      },
      {
        path: 'recovery', component: RecoveryComponent
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'login', component: LoginPageComponent
      },
      {
        path: 'product/:id', component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
