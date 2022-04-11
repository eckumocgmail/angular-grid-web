import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDataTableComponent } from './custom-data-table.component';

@NgModule({
  declarations: [
    CustomDataTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDataTableComponent
  ]
})
export class CustomDataTableModule { }
