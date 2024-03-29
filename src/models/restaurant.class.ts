export class Restaurant{
    publishID : string;
    name : string;
    address : string;
    city : string;
    category : string[];
    backgroundImg : string;
    backgroundImgURL: string;
    logoImg : string;
    logoImgURL : string;
    rating : number;
    minOrder : number;
    minOrderString : string;
    deliveryTime : number;
    deliveryCost : number;
    deliveryCostString : string;
    menu : any [];

    constructor(obj?: any){
        this.publishID = obj? obj.publishID || "" : "";
        this.name = obj? obj.name || "" : "";
        this.category = obj? obj.category || "" : "";
        this.backgroundImg = obj? obj.backgroundImg || "" : "";
        this.backgroundImgURL = obj? obj.backgroundImgURL || "" : "";
        this.logoImg = obj? obj.logoImg || "" : "";
        this.logoImgURL= obj? obj.logoImgURL || "" : "";
        this.rating = obj? obj.rating || "" : "";
        this.minOrder = obj? obj.minOrder || "" : "";
        this.minOrderString = obj? obj.minOrderString || "" : "";
        this.deliveryTime = obj? obj.deliveryTime || "" : "";
        this.deliveryCost = obj? obj.deliveryCost || "" : "";
        this.deliveryCostString = obj? obj.deliveryCostString || "" : "";
        this.menu = obj? obj.menu || "" : "";
    }
}