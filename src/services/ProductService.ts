import {Product} from "../models/Product";
import {db} from "../db/pool";

class ProductService {
    async addProduct(product: Product): Promise<number> {
        // " + "'" + user.values().join("','") + "'" + "
        return await db.query("insert into product(title, description, image_url, price, sale_price, available) values (" + "'" + product.values().join("','") + "'" + ") returning id;");
    }
}

export const productService = new ProductService()