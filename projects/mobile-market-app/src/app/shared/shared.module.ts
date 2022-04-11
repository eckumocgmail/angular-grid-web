import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { TreeComponent } from './tree/tree.component';
import { TreeNavComponent } from './tree-nav/tree-nav.component';
import { TreeDragComponent } from './tree-drag/tree-drag.component';



@NgModule({
  declarations: [
    TreeComponent,
    TreeNavComponent,
    TreeDragComponent
  ],
  exports: [
    TreeComponent,
    TreeNavComponent,
    TreeDragComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule
  ]
})
export class SharedModule { }
