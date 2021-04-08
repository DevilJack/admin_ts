export class Product {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    salePrice: number;
    available: boolean;

    constructor(title: string,
                description: string,
                imageUrl: string,
                price: number,
                salePrice: number,
                available: boolean) {
        this.title = title ? title : '';
        this.description = description ? description : '';
        this.imageUrl = imageUrl ? imageUrl : '';
        this.price = price ? price : -1;
        this.salePrice = salePrice ? salePrice : -1;
        this.available = available ? available : false;
    }

    values(): any[] {
        return Object.values(this);
    }
}