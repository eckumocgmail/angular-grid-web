import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './navbar/navbar.component';
import { BootstrapDesignService } from './bootstrap-design.service';
import { SearchComponent } from './search/search.component';


@NgModule({
    providers:[
        BootstrapDesignService
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