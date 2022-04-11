import { Component } from '@angular/core';

 @Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent {

  searchQuery = '';
  searchOptions = [];  
  searchResults: Array<{
      poster_path: string, 
      title: string,
      overview: string,
      release_date: string,
  }>=[{ overview: 'Customization data grid provide you a easy way to consifure dynamic contents css options.', poster_path: '', title: 'Customization data grid', release_date: '11.04.2022'}];   

  onSearchInput(evt: any){

  }

  onSearchResult(evt: any){

  }
}
