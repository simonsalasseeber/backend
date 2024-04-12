import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { readFile } from 'fs/promises'
import { Category } from "src/entities/categories.entity";



@Injectable()
export class ProductsRepository  {
    constructor(
        @InjectRepository(Product) // principio de inversión de dependencias
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    
    async dataSource() {
        const file = await readFile('../ecommerce-simonsalasseeber/src/products/data.json', 'utf-8')
        // transformamos el contenido en un JSON
        const json = JSON.parse(file)
        return json;
    }
    

    async getProducts(page: number, limit: number) {
        const offset = (page - 1) * limit;
        const allProducts = await this.productsRepository.find();
        return allProducts.slice(offset, offset + limit);
    }

    async getProductById(id: string) {
        const product = await this.productsRepository.findOne({
            where: {id}
        });
        if(!product) {
            return "Couldn't find the product"
        }
        return product;
    }

    async getProductsByIds(ids: string[]): Promise<any[]> {
        const allProducts = await this.productsRepository.find();
        return allProducts.filter(product => ids.includes(product.id.toString()));
    }

    async addProduct(name: string, description: string, price: number, stock: number, imgUrl: string, category: Category): Promise<Product> {
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;
        newProduct.imgUrl = imgUrl;
        newProduct.category = category; // Assign the provided category directly
    
        // Save the new product to the database
        return await this.productsRepository.save(newProduct);
    }
    

    async addProductSeeder() {
        const productsData = await this.dataSource(); 
        const seededProducts: Product[] = [];
    
        for (const productData of productsData) {
            
                const category = await this.categoryRepository.findOne({ where: { name: productData.category } });
    
                if (category) {
                    const newProduct = this.productsRepository.create({
                        name: productData.name,
                        description: productData.description,
                        price: productData.price,
                        stock: productData.stock,
                        imgUrl: productData.imgUrl,
                        category: category 
                    });
                    
                    await this.productsRepository.save(newProduct);
                    seededProducts.push(newProduct);
                } else {
                    console.error(`Category '${productData.category}' not found for product '${productData.name}'`);
                }
            
        }
    
        return seededProducts;
    }
    

    async updateProduct(id: string, product: any) {
        const foundProduct = await this.productsRepository.findOne({
            where: {id}
        });
        if (!foundProduct) {
            return "couldn't find product";
        }
        await this.productsRepository.update(id, product)        
        return await this.productsRepository.findOneBy({id}); // returning the updated product
    }

    async deleteProduct(id: string) {
        const deletedProduct = await this.productsRepository.findOneBy({id})
        await this.productsRepository.remove(deletedProduct)
        return "product deleted succesfully"
    }
}