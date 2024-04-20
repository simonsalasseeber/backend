"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.First1713540339227 = void 0;
class First1713540339227 {
    constructor() {
        this.name = 'First1713540339227';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isAdmin" boolean NOT NULL DEFAULT false, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "phone" character varying NOT NULL, "country" character varying(50) NOT NULL, "address" text NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(12) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying(255) NOT NULL DEFAULT 'default-image-url.jpg', "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "REL_88850b85b38a8a2ded17a1f536" UNIQUE ("orderId"), CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ORDER_DETAIL_PRODUCTS" ("productId" uuid NOT NULL, "orderDetailId" uuid NOT NULL, CONSTRAINT "PK_c9f4dfbbcce5bec7089e2acfa70" PRIMARY KEY ("productId", "orderDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2470baa66bd42826c733e05794" ON "ORDER_DETAIL_PRODUCTS" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_88f60f7f6fcd80e59e5307df06" ON "ORDER_DETAIL_PRODUCTS" ("orderDetailId") `);
        await queryRunner.query(`CREATE TABLE "order_detail_products_product" ("orderDetailId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_dbbdfa402a5b0a50659b6e9bd1d" PRIMARY KEY ("orderDetailId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba400383a42d98a45c92d51277" ON "order_detail_products_product" ("orderDetailId") `);
        await queryRunner.query(`CREATE INDEX "IDX_93f8c696735d93f11b7f210bf0" ON "order_detail_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAIL_PRODUCTS" ADD CONSTRAINT "FK_2470baa66bd42826c733e057940" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAIL_PRODUCTS" ADD CONSTRAINT "FK_88f60f7f6fcd80e59e5307df068" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" ADD CONSTRAINT "FK_ba400383a42d98a45c92d512771" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" ADD CONSTRAINT "FK_93f8c696735d93f11b7f210bf09" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" DROP CONSTRAINT "FK_93f8c696735d93f11b7f210bf09"`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" DROP CONSTRAINT "FK_ba400383a42d98a45c92d512771"`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAIL_PRODUCTS" DROP CONSTRAINT "FK_88f60f7f6fcd80e59e5307df068"`);
        await queryRunner.query(`ALTER TABLE "ORDER_DETAIL_PRODUCTS" DROP CONSTRAINT "FK_2470baa66bd42826c733e057940"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93f8c696735d93f11b7f210bf0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ba400383a42d98a45c92d51277"`);
        await queryRunner.query(`DROP TABLE "order_detail_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88f60f7f6fcd80e59e5307df06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2470baa66bd42826c733e05794"`);
        await queryRunner.query(`DROP TABLE "ORDER_DETAIL_PRODUCTS"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.First1713540339227 = First1713540339227;
//# sourceMappingURL=1713540339227-first.js.map