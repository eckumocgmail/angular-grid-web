import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AuthComponent } from './auth.component';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class AuthModule { }
