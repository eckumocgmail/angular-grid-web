import { Output, EventEmitter, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    inputs: [ 'inputSearchOptions' ],
 
})
export class SearchComponent{
    
    searchQuery: string = '';

    inputSearchOptions: string[] = [];    
    @Output() searchQueryChanged = new EventEmitter();
    @Output() searchRequest = new EventEmitter();
    
    onSearch( query: string ){     
        this.searchRequest.emit( query );
    }

    onKeypress( evt: any ){
        console.log(evt.code);
        if( evt.code.toLowerCase()=='enter' ){
            this.onSearch( this.searchQuery );
        }
    }

    onInput( evt: any ){                
        this.searchQueryChanged.emit( this.searchQuery=evt.target.value   );
        this.onSearch(this.searchQuery);
    }
}