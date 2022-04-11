import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfigComponent } from './config.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,    
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    MatCheckboxModule
  ]
})
export class ConfigModule { }
