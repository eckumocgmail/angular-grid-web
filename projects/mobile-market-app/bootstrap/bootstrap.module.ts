import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './navbar.component';

import { SearchComponent } from './search.component';


@NgModule({
    providers:[
        
    ],
    imports:        [
        CommonModule,
        RouterModule
    ],
    declarations:   [
        NavBarComponent,
        SearchComponent 
    ],
    exports:        [        
        NavBarComponent,
        SearchComponent,
        RouterModule
    ],
    bootstrap:      [],
    
})
export class UiBootstrapModule{

}