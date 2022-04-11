import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContentService
{
    navbarBrand = 'Movie Search';
    navbarMenuitems=[
        {         
            link:   'advanced',
            label:  'advanced'
        },        
        {             
            link:   'login',
            label:  'login'
        },
        
    ];
}