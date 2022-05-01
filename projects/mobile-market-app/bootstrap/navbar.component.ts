import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

/**
 *  
 */
@Component({
  selector:     'app-navbar',
  template:  `
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 20px; padding-right: 20px;">

    <a class="navbar-brand" href="#"> {{ brand }} </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse"

          id="navbarSupportedContent">

      <ng-content></ng-content>

      <ul class="navbar-nav">
        <li class="nav-item active"
        style="display: flex; flex-direction: row; flex-wraqp: nowrap; width: 100%;">
            <a class="btn nav-link"
               style="padding: 5px 10px;"
               *ngFor="let menuitem of menuitems"
               [ngClass]="{  'disabled': menuitem.isEnabled()==false }"
               (click)="menuitem.onclick()"> 
                {{ menuitem.label }}
            </a>
        </li>       
      </ul>
      
    </div>
    </nav>`,
  inputs:     [ 'brand','menuitems' ],
  
})
export class NavBarComponent {  
  
  brand: string = 'Wellcome application';
  menuitems: Array<{
    label: string,
    isEnabled: ()=>boolean,
    onclick: ()=>any
  }> = [];

}
