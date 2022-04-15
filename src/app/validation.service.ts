import { Injectable } from "@angular/core";

@Injectable()
export class ValidationService 
{
    isRusText(text: string){
        const alf = 'ёйцукенгшщзхъфывапролджэячсмитьбю'+'ёйцукенгшщзхъфывапролджэячсмитьбю'.toUpperCase();
        for(let i=0; i<text.length; i++){
            if( alf.indexOf(text[i])==-1 )
                return false;
        }
        return true;
    }
    isEmail(text: string){
        const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return new RegExp(regexp).test(text);
    }
    isPhoneNumber(text: string){
        const numbers = '0123456789';
        if(text.length!=12)
            return false;
        for(let i=1; i<text.length; i++){
            if( numbers.indexOf(text[i])==-1 )
                return false;
        }
        if(text[0]=='+')
            return true;
        else return false;
    }
}