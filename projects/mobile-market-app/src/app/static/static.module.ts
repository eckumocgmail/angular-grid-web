import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './nav/nav.module';
import { ErrorModule } from './error/error.module';
import { ConfigModule } from './config/config.module';
import { AboutModule } from './about/about.module';



@NgModule({
  exports: [
    NavModule,
    ErrorModule,
    ConfigModule,
    AboutModule
  ],
  imports: [
    CommonModule,
    NavModule,
    ErrorModule,
    ConfigModule,
    AboutModule
  ]
})
export class StaticModule { }
