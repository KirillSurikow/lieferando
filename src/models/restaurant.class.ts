export class Restaurant{
    id: number;
    name : string;
    category : string[];
    img : string;
    logo : string;
    rating : number;
    minOrder : number;
    minOrderString : string;
    deliveryTime : number;
    deliveryCost : number;
    deliveryCostString : string;
    menu : any [];

    // constructor(obj?: any){
    //     this.id = obj.id;
    //     this.name = obj.name;
    //     this.category = obj.category;
    //     this.img = obj.img;
    //     this.logo = obj.logo;
    //     this.rating = obj.rating;
    //     this.minOrder = obj.minOrder;
    //     this.minOrderString = obj.minOrderString;
    //     this.deliveryTime = obj.deliveryTime;
    //     this.deliveryCost = obj.deliveryCost;
    //     this.deliveryCostString = obj.deliveryCostString;
    //     this.menu = obj.menu;
    // }
}