import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select/public-api';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  static label = 'Настройки';  
  
  constructor(     
    public appConfigService: AppConfigService) { }

  ngOnInit(): void {
    document.title = 'Настройки';
  }

  onSidenavIsAutoClosableOptionChanged(checked: boolean){
    console.log(checked);   
    this.appConfigService.sidenavIsAutoClosable = checked;
  }


  // выполняется при выборе цвета панели инструментов
  onToolbarColorChanged(evt: MatSelectChange){
    console.log(evt.value);   
    this.appConfigService.toolbarColor = evt.value; 
  }

  // выполняется при выборе положения панели инструментов
  onSidenavPositionChanged(evt: MatSelectChange){
    console.log(evt.value); 
    this.appConfigService.sidenavPosition = evt.value; 
  }

  

}
 