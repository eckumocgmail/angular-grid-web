import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorComponent } from './constructor.component';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';



@NgModule({
  declarations: [
    ConstructorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTreeModule
  ]
})
export class ConstructorModule { }
