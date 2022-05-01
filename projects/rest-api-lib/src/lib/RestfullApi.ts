import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './RestService';
import { ActiveObject, BussinessModel, ActionRequestModel, ActionResponseModel, DataController } from './rest-api-lib.module';
import { Configuration } from 'projects/restfull-client-app/src/Configuration';

/**
 * При инициаллизации выполняет запрос,
 * получает данные и передаёт их компоненту
 */
@Injectable()
export class RestfullApi implements ActiveObject {

  url: string = location.origin + '/api';

  valide: boolean = false;
  active: boolean = false;

  model: BussinessModel = null;

  controller: RestService<BussinessModel> = null;  

  headers = {

  }

  constructor( private configuration: Configuration ) {
    this.controller = new RestService<BussinessModel>( configuration );
  }

  getService<DatasetModel>() {
    return new RestService<DatasetModel>( this.configuration );
  }

  ngOnDestroy(): void {
    console.info(`[${this.constructor.name}] => `+`.ngOnDestroy();`);
    this.active = false;
    //this.controller.destroy(this);
  }

  OnSuccess(evt: any) {
    console.info(`[${this.constructor.name}] => `+`.OnSuccess(${evt});`);
    this.valide = true;
  }

  OnStart(evt: any) {
    console.info(`[${this.constructor.name}] => `+`.OnStart(${evt});`);
    this.active = true;
  }

  OnComplete(evt: any) {
    console.info(`[${this.constructor.name}] => `+`.OnComplete(${evt});`);
    this.active = false;
  }

  onError(evt: any) {
    console.info(`[${this.constructor.name}] => `+`.onError(${evt});`);
    this.valide = false;
  }

  ngOnInit(): void {
    try {     
      console.info(`[${this.constructor.name}] => `+'.ngOnInit();'); 
      /*this.controller.init(this)
        .then(
          (response)=>{         
            this.OnSuccess(response);
          },
          (err)=>{            
            this.onError(err);
          }
        );*/
    } catch (e) {
      this.onError(e);    
    } 
  }
}
