import { environment } from './environments/environment';

export class Configuration {
  
  environment = environment;
  baseUrl: string = null;

  constructor(){
    this.baseUrl = environment.baseUrl;
  }

  getBaseUrl(){
    return this.environment.baseUrl;
  }
}
