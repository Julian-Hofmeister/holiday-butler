import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'home',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tab1',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
