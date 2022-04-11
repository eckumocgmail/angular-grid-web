import { Component } from '@angular/core';
import { AppConfigService } from './static/app-config.service';
import { MMAService } from './mma.service';

@Component({
  selector:     'mobile-market-root',
  templateUrl:  './mma.component.html',
  styleUrls:    ['./mma.component.css']
})
export class MMAComponent {

  // управление боковой панелью( откр./закр. )
  menuIsVisible = false;
  
  // конструктор
  constructor( 
    private appService: MMAComponent,
    public appConfigService: AppConfigService ){}

  // выполняется по нажатию кнопки "меню"
  onMenuClicked(evt: Event){
    console.log(evt);
    this.menuIsVisible = this.menuIsVisible? false: true;
  }

  // выполняется по нажатию кнопки "меню"
  onSettingsClicked(evt: Event){
    console.log(evt);    
  }

  // выполняется по нажатию кнопки "приложения"
  onAppsClicked(evt: Event){
    console.log(evt);   
    this.openSelectApplicationDialog();
  }

  openSelectApplicationDialog()
  {

  }
  
  

  // выполняется при выходе курсора с области боковой панели
  onMouseLeavedSidenav(evt: Event){
    console.log('this.appConfigService.sidenavIsAutoClosable',this.appConfigService.sidenavIsAutoClosable);
    if( this.appConfigService.sidenavIsAutoClosable ){
      this.menuIsVisible = this.menuIsVisible? false: true;
    }    
  }

  
}
