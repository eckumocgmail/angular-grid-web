import { ActionModel } from "./action-model";

export class CardModel {

    constructor(
        public title?: string,
        public subtitle?: string,
        public description?: string,
        public actions?: ActionModel[] ){}

}
