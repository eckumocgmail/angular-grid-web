import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ConstructorModule } from './constructor/constructor.module';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    PrivateRoutingModule,
    ConstructorModule,
    EditorModule
  ]
})
export class PrivateModule { }
