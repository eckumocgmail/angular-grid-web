export class ActionModel{
    constructor(public label: string, public href: string){}
}

export class CardModel {

    constructor(
        public title?: string,
        public subtitle?: string,
        public description?: string,
        public actions?: ActionModel[] ){}

}
