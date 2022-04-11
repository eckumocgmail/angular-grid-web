import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    LoginRoutingModule,
    RegistrationModule,
    AuthModule
  ]
})
export class LoginModule { }
