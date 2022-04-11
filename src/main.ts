import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/root.module';
import { environment } from './environments/environment';

(function(context){
  console.info(context);
  const started = new Date().getTime();

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(RootModule)
    .catch(err => console.error(err))
    .finally( ()=>{
      const completed = new Date().getTime();
      const time = completed-started;
      console.warn('[AppModule] bootstraped at '+time+' ms');
    });
    
})(self);