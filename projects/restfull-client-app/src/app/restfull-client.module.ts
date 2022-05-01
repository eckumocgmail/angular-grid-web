import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RestfullRoutingModule } from './restfull-client-routing.module';
import { RestfullClientComponent } from './restfull-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestfullApi } from 'projects/rest-api-lib/src/lib/RestfullApi';
import { HttpClientModule } from '@angular/common/http';
import { RestApiLibModule } from 'projects/rest-api-lib/src/public-api';

@NgModule({
  declarations: [
    RestfullClientComponent
  ],
  imports: [
    BrowserModule,
    RestfullRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RestApiLibModule
  ],
  providers: [],
  bootstrap: [RestfullClientComponent]
})
export class RestfullClientModule 
{ 
  constructor( private restfullApi: RestfullApi ){
    
  }
}
