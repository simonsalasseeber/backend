"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductsMigration1714384016895 = void 0;
const categories_entity_1 = require("../entities/categories.entity");
const products_entity_1 = require("../entities/products.entity");
class AddProductsMigration1714384016895 {
    async up(queryRunner) {
        const products = [
            {
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": 199.99,
                "stock": 12,
                "imgurl": "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg",
                "category": "smartphone"
            },
            {
                "name": "Samsung Galaxy S23",
                "description": "The best smartphone in the world",
                "price": 150.0,
                "stock": 12,
                "imgurl": "https://images.start.com.ar/SM-S918BZKVARO-2.jpg",
                "category": "smartphone"
            },
            {
                "name": "Motorola Edge 40",
                "description": "The best smartphone in the world",
                "price": 179.89,
                "stock": 12,
                "imgurl": "https://images.fravega.com/f1000/e8b9fbbbd0bc9cfbd89147c91f7eba3f.jpg",
                "category": "smartphone"
            },
            {
                "name": "Samsung Odyssey G9",
                "description": "The best monitor in the world",
                "price": 299.99,
                "stock": 12,
                "imgurl": "https://images.fravega.com/f1000/c6320328a79f21e1e1cdfbc2f0d694fc.jpg",
                "category": "monitor"
            },
            {
                "name": "LG UltraGear",
                "description": "The best monitor in the world",
                "price": 199.99,
                "stock": 12,
                "imgurl": "https://microsites-production-latam.s3.amazonaws.com/uploads/1693227846-3.jpg",
                "category": "monitor"
            },
            {
                "name": "Acer Predator",
                "description": "The best monitor in the world",
                "price": 150.0,
                "stock": 12,
                "imgurl": "https://i.ebayimg.com/images/g/VDQAAOSwFbdiuT3j/s-l1200.jpg",
                "category": "monitor"
            },
            {
                "name": "Razer BlackWidow V3",
                "description": "The best keyboard in the world",
                "price": 99.99,
                "stock": 12,
                "imgurl": "https://front.dev.malditohard.com.ar/img/migration/TECLADO-GAMER-RAZER-BLACKWIDOW-V3-GREEN-SP.webp",
                "category": "keyboard"
            },
            {
                "name": "Corsair K70",
                "description": "The best keyboard in the world",
                "price": 79.99,
                "stock": 12,
                "imgurl": "https://deventas.com/wp-content/uploads/2023/09/Diseno-sin-titulo-2023-11-03T001548.412.jpg",
                "category": "keyboard"
            },
            {
                "name": "Logitech G Pro",
                "description": "The best keyboard in the world",
                "price": 59.99,
                "stock": 12,
                "imgurl": "https://promart.vteximg.com.br/arquivos/ids/4592347-1000-1000/image-fca1ec8a24324f18b6a9b48b63a6d422.jpg?v=637812687783130000",
                "category": "keyboard"
            },
            {
                "name": "Razer Viper",
                "description": "The best mouse in the world",
                "price": 49.99,
                "stock": 12,
                "imgurl": "https://aypcomputacion.com/wp-content/uploads/2022/02/2-24.jpg",
                "category": "mouse"
            },
            {
                "name": "Logitech G502 Pro",
                "description": "The best mouse in the world",
                "price": 39.99,
                "stock": 12,
                "imgurl": "https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2024/02/651851_432831_01_front_zoom.jpg?fit=1000%2C1000&ssl=1",
                "category": "mouse"
            },
            {
                "name": "SteelSeries Rival 3",
                "description": "The best mouse in the world",
                "price": 29.99,
                "stock": 12,
                "imgurl": "https://www.phi-digital.com/wp-content/uploads/2021/11/Mouse-PC-SteelSeries-Rival-52.jpg",
                "category": "mouse"
            }
        ];
        const entityManager = queryRunner.manager;
        const seededProducts = [];
        for (const productData of products) {
            const category = await entityManager.findOne(categories_entity_1.Category, { where: { name: productData.category } });
            if (category) {
                const newProduct = entityManager.create(products_entity_1.Product, {
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                    imgurl: productData.imgurl,
                    category: category
                });
                await entityManager.save(newProduct);
                seededProducts.push(newProduct);
            }
            else {
                console.error(`Category '${productData.category}' not found for product '${productData.name}'`);
            }
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM product`);
    }
}
exports.AddProductsMigration1714384016895 = AddProductsMigration1714384016895;
//# sourceMappingURL=1714384616895-AddProductsMigration.js.map