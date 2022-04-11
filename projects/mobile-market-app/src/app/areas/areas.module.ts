import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { LoginModule } from './login/login.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { MMAService } from '../mma.service';
import { ConfigComponent } from '../static/config/config.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    PublicModule,
    PrivateModule,
    LoginModule
  ],
  exports: [RouterModule] 
})
export class AreasModule implements OnInit { 

  routes: any = [
    {path: '', redirectTo: 'public', pathMatch: 'full' },
    {
      path: 'config',     
      label: 'config',     
      component: ConfigComponent
    },
    {
      path: 'login',     
      loadChildren: () => import('./login/login-routing.module').then(mod => mod.LoginRoutingModule),  
    },
    {
      path: 'public',     
      loadChildren: () => import('./public/public-routing.module').then(mod => mod.PublicRoutingModule),  
    },
    {
      path: 'private',     
      loadChildren: () => import('./private/private-routing.module').then(mod => mod.PrivateRoutingModule),  
    },
  ]

  constructor( 
    private router: Router,
    private appService: MMAService  ){      
      this.ngOnInit();
  }

  ngOnInit(): void {    
    this.router.resetConfig(
      this.appService.init(this).concat(this.routes)
    ); 
  }

}