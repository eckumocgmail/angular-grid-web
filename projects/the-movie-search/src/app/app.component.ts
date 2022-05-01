import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title:  string            = 'ui-bootstrap';  
  searchResults: Array<any>=[];
  onSearchResult: any;

  constructor( public app: AppService ){
    document.title = this.title;    
    const ctrl = this;
    this.app.js.update.subscribe((evt)=>{
      ctrl.searchResults = ctrl.app.js.scope.data;
      console.log(ctrl.searchResults);
    });
    this.onSearchResult=function(resp: any){
      ctrl.searchResults = resp.results;
    }
  }

   

  onSearchError( error: any ){
    console.error( error );

  }

}
 