import { Output, EventEmitter, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-search',
    template: `
    <div #form class="form-inline my-2 my-lg-0 d-flex flex-nowrap w-100" 
        (submit)="onSearch( query.value )" 
        (keypress)="onKeypress( $event )">
        <input  class="form-control mr-sm-2 w-100" type="text" placeholder="Поиск" aria-label="Search" (input)="onInput($event)" autofocus="true" #query  />
        <button class="btn btn-secondary my-2 my-sm-0" type="submit" (click)="onSearch( query.value )">
            поиск
        </button>

    </div>`,
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