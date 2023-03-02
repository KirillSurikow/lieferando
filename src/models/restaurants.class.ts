import { Restaurant } from "./restaurant.class";

export class Restaurants {
    allRestaurants = [
        new Restaurant({
            'id': 1,
            'name': 'American Burgers',
            'category': ['all', 'american'],
            'img': './../assets/img/restaurants/american.jpg',
            'logo': './../assets/img/restaurantLogos/bull.png',
            'rating': 4,
            'minOrder': 7.00,
            'minOrderString': '7,00€',
            'deliveryTime': 45,
            'deliveryCost': 4.00,
            'deliveryCostString' : '4,00€',
            'menu': []
        }),
        new Restaurant({
            'id': 2,
            'name': 'Bennys Place',
            'category': ['all', 'italian'],
            'img': './../assets/img/restaurants/italian.jpg',
            'logo': './../assets/img/restaurantLogos/pizza.png',
            'rating': 3,
            'minOrder': 20.00,
            'minOrderString': '20,00€',
            'deliveryTime': 75,
            'deliveryCost': 3.00,
            'deliveryCostString' : '3,00€',
            'menu': []
        }),
        new Restaurant({
            'id': 3,
            'name': 'Aladdin',
            'category': ['all', 'oriental'],
            'img': './../assets/img/restaurants/oriental.jpg',
            'logo': './../assets/img/restaurantLogos/moon.png',
            'rating': 5,
            'minOrder': 16.00,
            'minOrderString': '16,00€',
            'deliveryTime': 35,
            'deliveryCost': 4.50,
            'deliveryCostString' : '4,50€',
            'menu': []
        }),
        new Restaurant(    {
            'id': 4,
            'name': 'Old Samurai',
            'category': ['all', 'japanese'],
            'img': './../assets/img/restaurants/japanese.jpg',
            'logo': './../assets/img/restaurantLogos/samurai.png',
            'rating': 4,
            'minOrder': 25.00,
            'minOrderString': '25,00€',
            'deliveryTime': 60,
            'deliveryCost': 4.00,
            'deliveryCostString' : '4,00€',
            'menu': []
        }),
        new Restaurant({
            'id': 5,
            'name': 'Sunny Phuket',
            'category': ['all', 'thai'],
            'img': './../assets/img/restaurants/thai.jpg',
            'logo': './../assets/img/restaurantLogos/tuk-tuk.png',
            'rating': 4,
            'minOrder': 7.00,
            'minOrderString': '7,00€',
            'deliveryTime': 30,
            'deliveryCost': 2.50,
            'deliveryCostString' : '2,50€',
            'menu': []
        }),
        new Restaurant( {
            'id': 6,
            'name': 'Hong Kong Dinner',
            'category': ['all', 'chinese'],
            'img': './../assets/img/restaurants/chinese.jpg',
            'logo': './../assets/img/restaurantLogos/dragon.png',
            'rating': 5,
            'minOrder': 9.00,
            'minOrderString': '9,00€',
            'deliveryTime': 25,
            'deliveryCost': 4.00,
            'deliveryCostString' : '4,00€',
            'menu': []
        }) 
    ]
}