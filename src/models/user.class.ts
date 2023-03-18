export class User{
    userID : string = "";
    myRestaurants : any = [];
    databaseID : string = "";

    constructor(id : string){
        this.userID = id;
    }
}