import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from './RestService';
import { ActiveObject, DataController } from './rest-api-lib.module';

/**
 *
 */
@Component({
  selector: 'rest-api',
  template: `
    <p>
      rest-api-lib works!
    </p>
  `,
  styles: [],
  inputs: [
    'url', 'message', 'headers'
  ]
})
export class RestComponent<DatasetModel>
  extends DataController
  implements OnInit, OnDestroy, ActiveObject {

  valide: boolean = false;
  active: boolean = false;

  model: DatasetModel = null;
  
  controller: RestService<DatasetModel>;

  constructor() {
    super();

  }

  ngOnDestroy(): void {
    this.active = false;
    //this.controller.destroy(this);
  }

  OnSuccess(evt: any) {
    this.valide = true;
  }

  OnStart(evt: any) {
    this.active = true;
  }

  OnComplete(evt: any) {
    this.active = false;
  }

  onError(evt: any) {
    this.valide = false;
  }

  ngOnInit(): void {
    try {
      //this.controller.init(this);
    } catch (e) {
      this.onError(e);
    } finally {
      this.OnComplete(this);
    }
  }

}
