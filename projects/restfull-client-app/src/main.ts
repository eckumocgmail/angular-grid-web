import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RestfullClientModule} from './app/restfull-client.module';
import { Configuration } from './Configuration';
import { environment } from './environments/environment';

(function(context: any){
  
  console.log(context);
  const started = new Date().getTime();
  if (environment.production) {
    enableProdMode();
  } 
  const services = [
    {
      multi:   false,
      provide: Configuration       
    }
  ];
  platformBrowserDynamic(services)
    .bootstrapModule(RestfullClientModule)
    .catch(err => console.error(err))
    .finally(()=>{
      const now = new Date().getTime();
      const seconds = (now-started)/1000;
      console.info('Выполнение приложения заняло '+seconds+' секунд');
    });


})(self);
