import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RestfullApi } from './RestfullApi';
import { RestfullComponent } from './RestfullComponent';

export interface OnError
{
  onError( evt: any );
}

export interface OnStart
{
  OnStart( evt: any );
}

export interface OnSuccess
{
  OnSuccess( evt: any );
}

export interface OnComplete
{
  OnComplete( evt: any );
}

export interface ActiveObject 
  extends OnSuccess, OnError, OnStart, OnStart, OnComplete
{
  
}



/**
 * Модель вызова процедуры
 */


export class ActionResponseModel {
  request: ActionRequestModel = null;
  status: boolean = false;
  results: any;
}


/**
 * Модель бизнес процесса
 */
 export class BussinessModel {
}

/**
 *
 *
 */
 export class DataController {
    url: string;
    headers: { [property: string]: string; };
    message: any;
  }
  

  /**
 * Модель вызова процедуры
 */


export class ActionRequestModel {
  action: string = 'init';
  params: { [property: string]: string; };
}

/**
 *  
 */
@NgModule({
  declarations: [
    RestfullComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    RestfullComponent
  ],
  providers: [
    RestfullApi
  ]
})
export class RestApiLibModule { }
