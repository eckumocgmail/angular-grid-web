import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UiBootstrapModule } from './bootstrap/bootstrap.module';
import { RouterModule } from '@angular/router';
import { IndexRouteComponent } from './app-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MMAModule } from 'projects/mobile-market-app/src/app/mma.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent
  ],
  exports: [
    UiBootstrapModule,
    MatCardModule,
    MatButtonModule,
    MMAModule,
    RouterModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiBootstrapModule,
    RouterModule.forRoot([
      { path: '',               pathMatch: 'full', redirectTo: '/index' },
      { path: 'index/:query',   component:  IndexRouteComponent, pathMatch: 'full' },
      { path: 'index',          component:  IndexRouteComponent, pathMatch: 'full' },
      { path: '**',             pathMatch: 'full', redirectTo: '/index' }
    ] ),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MMAModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
