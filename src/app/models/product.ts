export class Product {
    id: any;
    name: any;
    description: any;
    price: any;
    imageUrl: any;

    constructor(id=0, name='', description='', price=0, imageUrl='https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/Pizza%20Hut%20PL/NEW%20WWW/500px_center_margherita-min.jpg'){
        this.id=id
        this.name=name
        this.description=description
        this.price=price
        this.imageUrl=imageUrl
    }
}