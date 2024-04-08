import { Injectable } from "@nestjs/common";
//12:55 reloj abajo CR
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
    async getProducts(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.products.slice(offset, offset + limit);
    }

    async getProductById(id: string) {
        return this.products.find(product => product.id === Number(id));
    }
    async addProduct(product: any) {
        return this.products.push(product)
    }
    async updateProduct(id: string, product: any) {
        const foundProduct = this.products.find(product => product.id === Number(id))
        if (!foundProduct) {
            return "couldn't find product";
        }
        const updatedProduct = {...foundProduct, product}
        const index = this.products.findIndex((product) => product.id === Number(id))
        this.products[index] = updatedProduct;
        return updatedProduct.id;
    }
    async deleteProduct(id: string) {
        const index = this.products.findIndex((product) => product.id === Number(id))
        const product = this.products[index];
        this.products.splice(index, 1);
        return product.id;
    }
}