import { Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@Injectable({
  providedIn: 'any'
})
export class MMAService {

  constructor() { }

  // просматривает переменные модуля маршрутизации,
  // выбирает модули, получает обьявленные компоненты,
  // создаёт к ним маршруты
  init( routingModule: any ){
    console.log(routingModule);
    const ctrl = this;
    
    const factory: any = routingModule instanceof(Function)? routingModule: routingModule.constructor;
    const providers: any[] = factory['ɵmod']['providers'];
    const declarations: any[] = factory['ɵmod']['declarations'];
    const imports: any[] = factory['ɵmod']['imports'];
    let routingComponents: any[] = declarations.filter(p=>p.name.endsWith('Component'));
    imports.forEach(mod=>{
      const subimports: any[] = mod['ɵmod']['imports'];
      console.log(subimports);
      if( subimports && subimports instanceof Array && subimports.indexOf(SharedModule) != -1 ){
        routingComponents = routingComponents.concat(ctrl.init(mod));
      }
      
    });
 
    console.log('Получение маршрутов для компонентов: ', routingComponents);
    return routingComponents.map(p=>Object.assign(p,{
      path:       p.name.replace('App','').replace('Component','').toLowerCase(),
      label:      p.label? p.label: p.name.replace('App','').replace('Component','').toLowerCase(),
      component:  p
    }));
  }
  init_bak( routingModule: any ){
    let routingComponents: any[] = [];
    for(var p in routingModule ){            
      const value = (<any>routingModule)[p];
      if(value.constructor.name.endsWith('Module')){
        const declarations = value.constructor['ɵmod']['declarations'];
        routingComponents = routingComponents.concat(declarations);        
      }      
    }
    routingComponents = routingComponents.filter(p=>p.name.endsWith('Component'));
    console.log('Получение маршрутов для компонентов: ', routingComponents);
    return routingComponents.map(p=>Object.assign(p,{
      path:       p.name.replace('App','').replace('Component','').toLowerCase(),
      label:      p.label? p.label: p.name.replace('App','').replace('Component','').toLowerCase(),
      component:  p
    }));
  }

  
}
