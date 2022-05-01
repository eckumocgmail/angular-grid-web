import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'projects/restfull-client-app/src/Configuration';
import { catchError, map } from 'rxjs';
import { ActiveObject, BussinessModel, ActionRequestModel, ActionResponseModel, DataController } from './rest-api-lib.module';

/**
 * При инициаллизации выполняет запрос,
 * получает данные и передаёт их компоненту
 */
@Injectable()
export class RestService<DatasetModel> {

  constructor( private configuration: Configuration ) { }
  

  get(url: string): Promise<DatasetModel> {
    return this.request('GET', url, null, { headers: {} }); 
  }


  put(url: string): Promise<DatasetModel> {
    return this.request('PUT', url, null, { headers: {} }); 
  }


  patch(url: string): Promise<DatasetModel> {
    return this.request('PATCH', url, null, { headers: {} }); 
  }


  delete(url: string): Promise<DatasetModel> {
    return this.request('DELETE', url, null, { headers: {} }); 
  }


  post(
    url:      string, 
    message:  any, 
    options: { 
      headers: {[property: string]: string}
    }): Promise<DatasetModel>
  {
    return this.request('POST', url, message, options); 
  }


  request(
    method: string,
    url: string, 
    message: any, 
    options: { 
      headers: {[property: string]: string}
    }): Promise<DatasetModel>  
  {
    return new Promise<DatasetModel>((resolve,reject)=>{

      console.log(`post(${url})`);

      const request = new XMLHttpRequest();
      request.responseType = 'json';

      const headers = Object.getOwnPropertyNames(options.headers);
      headers.forEach( name=>{
        request.setRequestHeader(name,options.headers[name]);
      });
         
      request.addEventListener('readystatechange',()=>{
        switch(request.readyState){
          case request.OPENED: 
            console.warn(`${method} ${url} ${request.status} ${request.statusText} ONREADYSTATECHANGE TO OPENED`);
            break;
          case request.HEADERS_RECEIVED: 
            console.warn(`${method} ${url} ${request.status} ${request.statusText} ONREADYSTATECHANGE TO HEADERS_RECEIVED`);
            break;
          case request.LOADING: 
            console.warn(`${method} ${url} ${request.status} ${request.statusText} ONREADYSTATECHANGE TO LOADING`);
            break;
          case request.DONE: 
            console.warn(`${method} ${url} ${request.status} ${request.statusText} ONREADYSTATECHANGE TO DONE`);
            switch(request.status){
              case 200: 
                resolve(request.response);
                break;
              default:
                reject({
                  url:      url,
                  status:   request.status,
                  message:  request.statusText
                });
                break;
            } 
            break;

          default: 
            throw new Error(`Error while executing ${method} request: `+url);
        }
        
      },true);
 
      request.open(`${method}`,url,true);
      request.send(!message? null: JSON.stringify(message) );
    });
  }




  
}
