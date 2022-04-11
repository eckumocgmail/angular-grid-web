import { Component, OnInit } from '@angular/core';
import { AppServicesService } from './../app-services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  static label = 'Услуги';  

  constructor(
    public appServicesService: AppServicesService ) { }

  ngOnInit(): void {
    document.title = 'Услуги';
  }

}
