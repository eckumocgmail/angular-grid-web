import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  // режим авто-закрытия боковой панели
  public sidenavIsAutoClosable = true;

  // цвет панели инструментов
  public toolbarColor: 'primary'|'secondary'|'accent' = 'primary';

  // позиция боковой панели( лево-право )
  public sidenavPosition: 'start'|'end' = 'start';

  constructor() {     
    console.log(this.constructor.name);
  }
}
