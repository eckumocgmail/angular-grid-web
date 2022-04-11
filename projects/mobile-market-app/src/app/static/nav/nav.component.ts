import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

   

 
  constructor( 
    public router: Router,
    public appConfigService: AppConfigService ) { }

  ngOnInit(): void {
  }

  get routes(){
    return (<any[]>(this.router.config));
  }

}

