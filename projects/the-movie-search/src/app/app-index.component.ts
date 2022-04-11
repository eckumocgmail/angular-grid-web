import { Component } from '@angular/core';
import { AppService } from './app.service';
import { RouterStateSnapshot, Router, RouterState, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-route',
  templateUrl: './app-index.component.html'
})
export class IndexRouteComponent {

  searchOptions = [];
  
  services: any[] = [
    {title: 'title', subtitle: 'subtitle', description: 'description', actions: [{label: 'ok'}]}
  ];


  constructor( private route: ActivatedRoute, ){
    this.route.params.subscribe((params)=>{
        console.log(params);
    });
  }

  
  onSearchRequest(evt){
    
  }
  
  onSearchQueryChanged(evt){

  }

}
