import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MMAComponent } from './mma.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MMAService } from './mma.service';
import { MatInputModule } from '@angular/material/input';
import { StaticModule } from './static/static.module';
import { RouterModule } from '@angular/router';
import { AreasModule } from './areas/areas.module';

@NgModule({
  declarations: [
    MMAComponent    
  ],
  imports: [
    
    StaticModule,  
    AreasModule, 
    BrowserModule,
    AreasModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule        
  ],
  providers: [MMAService],
  bootstrap: [MMAComponent]
})
export class MMAModule { }
