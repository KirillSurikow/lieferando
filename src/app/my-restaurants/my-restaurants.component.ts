import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable, } from '@angular/fire/storage';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateExtrasComponent } from '../dialog-create-extras/dialog-create-extras.component';
import { DialogEditDishComponent } from '../dialog-edit-dish/dialog-edit-dish.component';
import { DialogDeleteRestaurantComponent } from '../dialog-delete-restaurant/dialog-delete-restaurant.component';



const exitTransitionLeft = transition(':leave', [
  style({
    transform: 'translateX(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(-100vw)'
  }))
])

const exitTransitionRight = transition(':leave', [
  style({
    transform: 'translateX(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(100vw)'
  }))
])

const enterTransitionLeft = transition(':enter', [
  style({
    transform: 'translateX(100vw)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(0)'
  }))
])

const enterTransitionRight = transition(':enter', [
  style({
    transform: 'translateX(-100vw)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(0)'
  }))
])

const enterTransitionUp = transition(':enter', [
  style({
    transform: 'translateY(100vh)'
  }),
  animate('500ms ease-in', style({
    transform: 'translateY(0)'
  }))
])

const exitTransitionDown = transition(':leave', [
  style({
    transform: 'translateY(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateY(100vh)'
  }))
])

const slideLeftIn = trigger('slideLeftIn', [enterTransitionLeft])
const slideLeftOut = trigger('slideLeftOut', [exitTransitionLeft])
const slideRightOut = trigger('slideRightOut', [exitTransitionRight])
const slideRightIn = trigger('slideRightIn', [enterTransitionRight])
const slideUpIn = trigger('slideUpIn', [enterTransitionUp])
const slideDownOut = trigger('slideDownOut', [exitTransitionDown])

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss'],
  animations: [slideLeftOut, slideLeftIn, slideRightOut, slideRightIn, slideUpIn, slideDownOut]
})
export class MyRestaurantsComponent implements OnInit {
  userID: string;
  userData: object;
  myRestaurants = [];
  overview: boolean = true;
  detailedView: boolean = false;
  logoImg: string;
  backgroundImg: string;
  logoImgURL: string;
  logoImgFile: any;
  backgroundImgFile: any;
  backgroundImgURL: string;
  publishID: string;
  name: string;
  category: string[];
  rating: string;
  minOrder: number;
  minOrderString: string;
  deliveryTime: string;
  deliveryCost: number;
  deliveryCostString: string;
  menu: any;
  currentRestaurant: number;
  editActive: boolean = false;
  changingName: boolean = false;
  changingLogo: boolean = false;
  changingImg: boolean = false;
  changingDescribtion: string;
  copyLogo: string;
  copyImg: string;
  copyLogoImgURL: string;
  copyBackgroundImgURL: string;
  copyName: string;
  copyRating: string;
  copyMinOrder: number;
  copyMinOrderString: string;
  copyDeliveryTime: string;
  copyDeliveryCost: number;
  copyDeliveryCostString: string;
  copyMenu: any;
  uploading = false;
  menuActive = false;
  addDishActive = false;
  dishName: string;
  dishCategory: string;
  dishPrice: number;
  dishDescribtion: string;
  dishPriceAsString: string = "";
  menuUnsorted: any = [];
  menuObj: any = [];
  categoryList: any = [];
  multiplePortions: boolean = false;
  allPortions = [];
  portionTag: string;
  portionPrice: number;


  constructor(private gfs: Firestore,
    private curr: CurrencyService,
    private firestore: FirebaseService,
    public dialog: MatDialog,
    private storage: Storage
  ) {
  }

  ngOnInit(): void {
    this.organizeUserData();
    this.subscribeToPublishID();
  }

  organizeUserData() {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
  }

  /**
   * downloading user data from firebase
   * 
   * @param userID string
   */
  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    let testObj = fetchedObject['userData']['myRestaurants'];
    if (testObj.length > 0) {
      this.extractData(fetchedObject)
    }
  }

  /**
   * extracting the user's restaurants
   *     
   * @param object object
   */
  extractData(object: object) {
    let string = object['userData']['myRestaurants'];
    this.myRestaurants = JSON.parse(string);
  }

  /**
   * if a restaurant is published,
   *  it has a publishId because there are two collections in firebase. One for the public and for the restaurant owners
   * 
   */
  subscribeToPublishID() {
    this.firestore.publishIdEmitter.subscribe((id) => {
      this.publishID = id;
      this.updateMyRestaurants();
      this.saveChanges();
    })
  }

  /**
   * you can view details of a restaurant
   * 
   * @param i id of restaurant
   */
  showDetails(i: number) {
    this.hideOverview();
    this.showDetailedView();
    this.assignDataToMask(i);
    this.createCopies();
  }

  /**
   * changing the layout for a detailed view
   * 
   */
  showDetailedView() {
    this.detailedView = true;
  }

  /**
  * changing the layout for an overview
  * 
  */
  hideOverview() {
    this.overview = false;
  }

  /**
   * assinging the restaurant's data to the mask
   *     
   * @param i number
   */
  assignDataToMask(i: number) {
    this.currentRestaurant = i;
    this.logoImg = this.myRestaurants[i]['logoImg'];
    this.backgroundImg = this.myRestaurants[i]['backgroundImg'];
    this.logoImgURL = this.myRestaurants[i]['logoImgURL'];
    this.backgroundImgURL = this.myRestaurants[i]['backgroundImgURL'];
    this.name = this.myRestaurants[i]['name'];
    this.category = this.myRestaurants[i]['category'];
    this.publishID = this.myRestaurants[i]['publishID'];
    this.rating = this.myRestaurants[i]['rating'];
    this.minOrderString = this.myRestaurants[i]['minOrderString'];
    this.minOrder = this.myRestaurants[i]['minOrder'];
    this.deliveryTime = this.myRestaurants[i]['deliveryTime'];
    this.deliveryCostString = this.myRestaurants[i]['deliveryCostString'];
    this.deliveryCost = this.myRestaurants[i]['deliveryCost'];
    this.menu = this.myRestaurants[i]['menu'];
  }

  /**
   * since the data could be edited, it is necessary to create copies
   * 
   */
  createCopies() {
    this.copyLogo = this.logoImg;
    this.copyImg = this.backgroundImg;
    this.copyLogoImgURL = this.logoImgURL;
    this.copyBackgroundImgURL = this.backgroundImgURL;
    this.copyName = this.name;
    this.copyRating = this.rating;
    this.copyMinOrder = this.minOrder;
    this.copyMinOrderString = this.minOrderString;
    this.copyDeliveryTime = this.deliveryTime;
    this.copyDeliveryCost = this.deliveryCost;
    this.copyDeliveryCostString = this.deliveryCostString;
    this.copyMenu = this.menu;
  }

  /**
   * changing the layout for editing the condition
   * 
   */
  changeCondition() {
    this.editActive = true;
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = false;
  }

  saveChanges() {
    this.prepareArray();
    this.prepareUpload();
    this.assignDataToMask(this.currentRestaurant);
  }

  /**
   * preparing the array which should be uploaded to firebase
   * 
   */
  prepareArray() {
    this.myRestaurants[this.currentRestaurant]['logoImg'] = this.copyLogo;
    this.myRestaurants[this.currentRestaurant]['backgroundImg'] = this.copyImg;
    this.myRestaurants[this.currentRestaurant]['logoImgURL'] = this.logoImgURL;
    this.myRestaurants[this.currentRestaurant]['backgroundImgURL'] = this.backgroundImgURL;
    this.myRestaurants[this.currentRestaurant]['name'] = this.copyName;
    this.myRestaurants[this.currentRestaurant]['publishID'] = this.publishID;
    this.myRestaurants[this.currentRestaurant]['rating'] = this.copyRating;
    this.myRestaurants[this.currentRestaurant]['minOrderString'] = this.curr.returnCurrency(this.copyMinOrder);
    this.myRestaurants[this.currentRestaurant]['minOrder'] = this.copyMinOrder
    this.myRestaurants[this.currentRestaurant]['deliveryTime'] = this.copyDeliveryTime;
    this.myRestaurants[this.currentRestaurant]['deliveryCostString'] = this.curr.returnCurrency(this.copyDeliveryCost);
    this.myRestaurants[this.currentRestaurant]['deliveryCost'] = this.copyDeliveryCost;
    this.myRestaurants[this.currentRestaurant]['menu'] = this.menu;
  }

  /**
  * preparing the object which should be uploaded to firebase
  * 
  */
  async prepareUpload() {
    let item = JSON.stringify(this.myRestaurants)
    let object = {
      userData: {
        myRestaurants: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }

  closeEdits() {
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = false;
    this.editActive = false;
    this.menuActive = false;
    this.addDishActive = false;
  }

  /**
   * editing data but not saving them
   * 
   */
  goBackNoSave() {
    this.selectRightPath();
    this.createCopies();
  }

  /**
   * the return arrow can trigger different functions depending on the current layout
   * 
   */
  selectRightPath() {
    if (this.detailedView && this.changingLogo
      || this.detailedView && this.changingName
      || this.detailedView && this.changingImg
      || this.detailedView && this.editActive) {
      this.closeEdits();
    }
    else {
      this.showOverview();
      this.hideDetailedView();
    }
  }

  showOverview() {
    this.overview = true;
  }

  hideDetailedView() {
    this.detailedView = false;
    this.menuActive = false;
    this.addDishActive = false;
  }

  changeName() {
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = true;
    this.editActive = false;
  }

  changeImg() {
    this.changingLogo = false;
    this.changingImg = true;
    this.changingName = false;
    this.editActive = false;
  }

  changeLogo() {
    this.changingLogo = true;
    this.changingImg = false;
    this.changingName = false;
    this.editActive = false;
  }

  /**
   * trigger the upload to the restaurant collection and it's animation
   * 
   */
  publish() {
    this.uploading = true;
    this.prepareJSON();
  }

  updateMyRestaurants() {
    this.myRestaurants[this.currentRestaurant]['publishID'] = this.publishID;

  }

  /**
   * upload to the public collection
   * 
   */
  async prepareJSON() {
    let item = {
      logoImg: this.logoImg,
      backgroundImg: this.backgroundImg,
      logoImgURL: this.logoImgURL,
      backgroundImgURL: this.backgroundImgURL,
      name: this.name,
      category: this.category,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.minOrderString,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.deliveryCostString,
      menu: this.menu
    }
    await this.firestore.publishChange(item);
    setTimeout(() => {
      this.uploading = false
    }, 2000);
  }

  /**
   * upload to the private collection
   * 
   */
  async uploadChanges() {
    this.uploading = true;
    let item = {
      logoImg: this.logoImg,
      backgroundImg: this.backgroundImg,
      name: this.name,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.minOrderString,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.deliveryCostString,
      menu: this.menu
    }
    await this.firestore.updateRestColl(this.publishID, item)
    setTimeout(() => {
      this.uploading = false
    }, 2000);
  }

  showMenu() {
    this.menuActive = true;
  }

  saveMenuChanges() {
    this.menuActive = false;
    this.saveChanges();
  }

  /**
   * changing layout to add dishes
   * 
   */
  openAddDish() {
    this.menuActive = false;
    setTimeout(() => {
      this.addDishActive = true;
    }, 200);
  }

  cancelAddDishes() {
    this.addDishActive = false;
  }

  /**
   * preparing a json holding the data for a new dish
   * 
   */
  addDish() {
    let dish = {
      "dishCategory": this.dishCategory,
      "dishName": this.dishName,
      "dishPrice": this.findDishPrice(),
      "dishPriceAsString": this.findDishPriceString(),
      "portionPrices": this.findPortionPrices(),
      "dishDescribtion": this.dishDescribtion,
      "dishExtras": this.findExtras(this.dishCategory),
      "multiplePortions": this.multiplePortions,
      "placed": false
    }

    this.findSpotInArray(dish);
    this.saveChanges();
    this.clearInputs();
  }

  findDishPrice(): any {
    if (!this.multiplePortions) {
      return this.dishPrice;
    } else {
      return null;
    }
  }

  findDishPriceString(): any {
    if (!this.multiplePortions) {
      return this.curr.returnCurrency(this.dishPrice);
    } else {
      return "";
    }
  }

  findPortionPrices(): any {
    if (this.multiplePortions) {
      return this.allPortions;
    } else {
      return [];
    }
  }

  findExtras(category): any {
    if (this.menu) {
      if (this.menu.find(element => element.categorykey == category)) {
        let target = this.menu.find(element => element.categorykey == category)
        let extras = target.categoryItem[0]['dishExtras'];
        return extras
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  /**
   * since the target array is a mapped array it is necessary to find the right spot or create a new
   * 
   * @param dish object
   */
  findSpotInArray(dish: object) {
    let spot = this.menu.find(category => category.categorykey == this.dishCategory);
    if (spot) {
      spot.categoryItem.push(dish)
    } else {
      this.createNewCategory(dish)
    }
  }

  /**
   * if a new food category is created it is necessary to create a new item in the array
   * 
   * @param dish 
   */
  createNewCategory(dish: object) {
    let newCategory = dish['dishCategory'];
    let json = {
      "categorykey": newCategory,
      "categoryItem": [dish]
    }
    this.menu.push(json);
  }

  convertToString(number: number) {
    let currency = number.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return currency
  }

  clearInputs() {
    this.dishCategory = "";
    this.dishName = "";
    this.dishPrice = null;
    this.portionTag = "";
    this.portionPrice = null;
    this.dishDescribtion = "";
    this.allPortions = [];
  }

  /**
   * open dialog to edit extras
   * 
   * @param category object
   * @param index number
   */
  openExtrasDialog(category: object, index: number) {
    const dialogRef = this.dialog.open(DialogCreateExtrasComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.currentCategory = category;
    dialogRef.componentInstance.index = index;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let target = this.menu[result[1]];
        target['categoryItem'].forEach(element => {
          element.dishExtras = result[0];
          this.saveChanges();
        });
      }
    })
  }

  /**
   * open dialog ot edit a dish
   * 
   * @param category string 
   * @param index number
   * @param dish object
   */
  openDishEditor(category, index, dish) {
    const dialogRef = this.dialog.open(DialogEditDishComponent, {
      width: '700px',
    })

    dialogRef.componentInstance.dish = dish;
    dialogRef.componentInstance.index = index;
    dialogRef.componentInstance.category = category;
    dialogRef.componentInstance.multiplePortions = dish['multiplePortions'];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menu[result[2]]['categoryItem'][result[1]] = result[0];
        this.saveChanges();
      }
    })
  }

  togglePortion() {
    if (this.multiplePortions == true)
      this.multiplePortions = false
    else
      this.multiplePortions = true
  }

  addPortion() {
    let item = {
      portionTag: this.portionTag,
      portionPrice: this.portionPrice,
      portionPriceString: this.curr.returnCurrency(this.portionPrice)
    }
    this.allPortions.push(item)
    this.allPortions = this.allPortions.sort((a, b) => a.portionPrice - b.portionPrice);
  }

  deletePortion(i: number) {
    this.allPortions.splice(i, 1)
  }

  deleteDish(i, j) {
    this.menu[i]['categoryItem'].splice(j, 1);
  }

  deleteRestaurant($event, i) {
    $event.stopPropagation();

    const dialogRef = this.dialog.open(DialogDeleteRestaurantComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.myRestaurants.splice(i, 1)
        this.prepareUpload();
      }
    })
  }

  uploadLogo(event) {
    this.logoImgFile = event[0];
    let name = event[0].name;
    this.logoImg = name;
    this.prepareUploadLogo();
  }

  uploadTheme(event) {
    this.backgroundImgFile = event[0];
    let name = event[0].name;
    this.backgroundImg = name;
    this.prepareUploadTheme();
  }

  removeBackground(event) {
    event.stopPropagation()
    this.backgroundImgFile = null;
    this.backgroundImg = "";
  }

  removeLogo(event) {
    event.stopPropagation()
    this.logoImgFile = null;
    this.logoImg = "";
  }

  prepareUploadLogo() {
    this.deleteOldLogo();
    this.uploadNewLogo();

  }

  deleteOldLogo() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-logo`);
    deleteObject(storageRef).then(() => {

    }).catch((error) => {

    });
  }

  uploadNewLogo() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-logo`);
    const uploadTask = uploadBytesResumable(storageRef, this.logoImgFile);
    uploadTask.on('state_changed',
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
          this.logoImgURL = downLoadUrl
        })
      }
    )
  }

  prepareUploadTheme() {
    this.deleteOldTheme();
    this.uploadNewTheme()
  }

  deleteOldTheme() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-theme`);
    deleteObject(storageRef).then(() => {

    }).catch((error) => {
      console.log('error')
    });
  }

  uploadNewTheme() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-theme`);
    const uploadTask = uploadBytesResumable(storageRef, this.backgroundImgFile);
    uploadTask.on('state_changed',
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
          this.backgroundImgURL = downLoadUrl
        })
      }
    )
  }
}
