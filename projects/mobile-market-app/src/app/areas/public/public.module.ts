import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class PublicModule { }
