import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'projects/mobile-market-app/src/app/shared/shared.module';
import { AccountComponent } from './account/account.component';
import { PersonComponent } from './person/person.component';
import { SuggestionsComponent } from './suggestion/suggestions.component';
 


@NgModule({
  declarations: [
    SuggestionsComponent,
    PersonComponent,
    AccountComponent,
    RegistrationComponent  
  ],
  imports: [
    SharedModule,
    CommonModule,
    RegistrationRoutingModule,
    MatStepperModule
  ]
})
export class RegistrationModule { }
