import { Injectable } from "@angular/core";
import { ContentService } from "./content.service";
 
import { AngularJsService } from "./angular-js.service";
import { SearchService } from "./search.service";

/**
 * This service collect all services of application at top level.
 */
@Injectable({
    providedIn: 'root'
})
export class AppService
{
    constructor( public content:   ContentService,
                 public js:        AngularJsService,
                 public search:    SearchService ){
        (<any>window)['app']=this;
    }
}