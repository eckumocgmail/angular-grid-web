import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Configuration } from 'projects/restfull-client-app/src/Configuration';
import { ActionRequestModel } from '../public-api';
import { RestComponent } from './RestComponent';
import { RestfullApi } from "./RestfullApi";
import { RestService } from './RestService';

@Component({
  selector: 'restfull-api',
  template: `

    {{ title }}
    <ul>
      <li *ngFor="let step of steps">        
        
        {{ step.name }}
        {{ step.status }}
      </li>
    </ul>
  `,
  styles: [],
  inputs: [
    'url', 'message', 'headers'
  ]
})
export class RestfullComponent implements OnInit, OnDestroy {

  title = '123123';
  steps: Array<{ name: string; status: boolean; }> = [];
   

  constructor(private http: HttpClient, private restfull: RestfullApi, private configuration: Configuration) {
   
  }


  ngOnInit(): void {

    
    this.restfull.getService<ActionRequestModel>();
    
  }

  ngOnDestroy(): void {
  }
  
  //

}
