import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root.component';
import { RouterModule } from '@angular/router';
import { IndexRouteComponent } from 'projects/the-movie-search/src/app/app-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppModule } from 'projects/the-movie-search/src/app/app.module';
import { UiBootstrapModule } from 'projects/mobile-market-app/bootstrap/bootstrap.module';
import { RootService } from './root.service';
import { ValidationService } from './validation.service';
import { MMAModule } from 'projects/mobile-market-app/src/app/mma.module';
import { StaticModule } from 'projects/mobile-market-app/src/app/static/static.module';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiBootstrapModule,   
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    AppModule,
    MMAModule,
    StaticModule
  ],
  providers: [RootService, ValidationService],
  bootstrap: [RootComponent]
})
export class RootModule { }
