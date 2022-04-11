import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root.component';
import { RouterModule } from '@angular/router';
import { IndexRouteComponent } from 'projects/the-movie-search/src/app/app-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CustomDataTableModule } from './custom-data-table/custom-data-table.module';
import { AppModule } from 'projects/the-movie-search/src/app/app.module';
import { UiBootstrapModule } from 'projects/the-movie-search/src/app/bootstrap/bootstrap.module';

@NgModule({
  declarations: [
    RootComponent
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
    AppModule, 
    CustomDataTableModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
