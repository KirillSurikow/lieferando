import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class CurrencyService {
    returnCurrency(value: number) {
        let number = Number(value);
        let currency = number.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });
        return currency
    }
}