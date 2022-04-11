import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorComponent } from './constructor.component';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';



@NgModule({
  declarations: [
    ConstructorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ConstructorModule { }
