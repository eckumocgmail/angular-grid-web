import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestfullApi } from 'projects/rest-api-lib/src/lib/RestfullApi';
import { Configuration } from '../Configuration';


@Component({
  selector: 'restfull-root',
  templateUrl: './restfull-client.component.html',
  styleUrls: ['./restfull-client.component.css']
})
export class RestfullClientComponent 
implements OnInit, OnDestroy{

  title = 'restfull-client-app';
  
  constructor( public configuration: Configuration  ){
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
