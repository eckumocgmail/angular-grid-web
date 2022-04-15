import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export type contacts = { 
    users:  Array<{
        name: string, 
        surname: string, 
        email: string,
        phone: string
    }>
}
    


@Injectable()
export class RootService 
{
    constructor( private http: HttpClient ) { }

    getLocal( setter ){
        if( localStorage[location.href.toString()] ){
            const data = JSON.parse(localStorage[location.href.toString()] );
            this.onSuccessDataRecivedCallback(setter)(data);
        }
            
        
    }

    getRemote( setter ){
        this.http.get<contacts>('http://87.242.76.45/testdata.json')
            .subscribe( this.onSuccessDataRecivedCallback(setter));
    }


        
    onSuccessDataRecivedCallback(setter) {
        return function(onSuccesscontactsDataRecived: contacts){
            setter(onSuccesscontactsDataRecived);
        }
    }

}
