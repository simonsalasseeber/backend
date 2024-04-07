import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: 'Producto 1',
            description: 'Este es el producto número 1.',
            price: 100.00,
            stock: true,
            imgUrl: 'https://example.com/product1.jpg'
         },
         {
            id: 2,
            name: 'Producto 2',
            description: 'Este es el producto número 2.',
            price: 200.00,
            stock: false,
            imgUrl: 'https://example.com/product2.jpg'
         },
         {
            id: 3,
            name: 'Producto 3',
            description: 'Este es el producto número 3.',
            price: 300.00,
            stock: true,
            imgUrl: 'https://example.com/product3.jpg'
         }
    ]
    async getProducts() {
        return this.products;
    }

    async getProductById(id: string) {
        return this.products.find(product => product.id === Number(id));
    }
    async addProduct() {
        return this.products.push()
    }
}