export class Order {
  amount: number;
  dishName: string;
  dishCategory: string;
  dishExtras: any;
  singlePrice: number;
  dishPriceAsString: string;
  multiplePortions: boolean;
  portionPrices: any;
  orderPrice: number;
  orderPriceString: string;
  changingOrder: boolean = false;
  dishDescribtion: string;
  pickedPortionNr: any = 0;
  placed: boolean;
  dishCopy: object;
  pickedExtrasText : string = "";

  constructor(obj) {
    console.log(obj)
    if (obj.amount) {
      this.amount = obj.amount;
    } else {
      this.amount = 1;
    }
    this.dishName = obj.dishName;
    this.dishDescribtion = obj.dishDescribtion;
    this.dishCategory = obj.dishCategory;
    this.dishExtras = obj.dishExtras;
    this.singlePrice = obj.dishPrice;

    if(!obj.dishPrice){
      this.singlePrice = obj.singlePrice;
    }
    this.portionPrices = obj.portionPrices;
    if (obj.pickedPortionNr) {
      this.pickedPortionNr = obj.pickedPortionNr;
    }
    this.dishCopy = obj.dishCopy;
    this.multiplePortions = obj.multiplePortions;
    if (this.multiplePortions) {
      this.changePortion();
    } else {
      this.countPrice;
    }
  }

  countPrice() {
    let extraPrices = [];
    this.dishExtras.forEach(element => {
      if (element.picked)
        extraPrices.push(element.extraPrice)
    });
    let extraSum = extraPrices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    this.orderPrice = this.amount * (extraSum + this.singlePrice);
    this.orderPriceString = this.returnCurrency(this.orderPrice);
  }

  changePortion() {
    if (this.portionPrices) {
      this.singlePrice = this.portionPrices[this.pickedPortionNr]['portionPrice'];
      this.countPrice();
    } else {
      console.log(this.dishCopy['portionPrices']) 
    }
  }

  returnSelected(i: number): any {
    if (i == 0)
      return true;
  }

  returnCurrency(value: number) {
    let number = Number(value);
    let currency = number.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return currency
  }

  returnPortionNr() {
    if (this.portionPrices) {
      let nr = parseInt(this.pickedPortionNr)
      return nr;
    } else {
      return null;
    }
  }

  returnSinglePrice() {
    return this.orderPrice / this.amount;
  }

  returnDescribtion() : any {
    let pickedExtrasText = '';
    for (let i = 0; i < this.dishExtras.length; i++) {
      let extra = this.dishExtras[i];
      if (extra.picked) {
        pickedExtrasText += `${extra.extraName}, `
      }
    }
    pickedExtrasText = pickedExtrasText.slice(0, -2);
    return pickedExtrasText;
  }
}