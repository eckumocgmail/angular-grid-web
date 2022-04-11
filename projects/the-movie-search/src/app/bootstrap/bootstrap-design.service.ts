import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BootstrapDesignService
{
    colors: 'light'|'dark'    = 'dark';
}