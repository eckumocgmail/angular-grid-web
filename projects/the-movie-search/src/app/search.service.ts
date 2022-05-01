import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AngularJsService } from './angular-js.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService{

    options: string[] = [];

    filter( query: string ){      
        return this.options.filter(( option )=>{
            return option.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        } );
    }

    search( query:       string, 
            resolve:    ( resp: any )=>any, 
            reject:     ( err: any )=>any    ){        
        this.js.scope.search({api_key:"72b56103e43843412a992a8d64bf96e9",query: query},resolve,reject);
    }

    constructor( private js: AngularJsService ){

    }
}
 
