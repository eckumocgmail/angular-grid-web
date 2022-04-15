import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector:     'app-navbar',
  templateUrl:  './navbar.component.html',
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
