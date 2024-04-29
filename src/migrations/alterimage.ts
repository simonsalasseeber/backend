import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeImgUrlToImgurl1714391142827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Renaming the column from "imgUrl" to "imgurl"
        await queryRunner.query(`ALTER TABLE product RENAME COLUMN "imgUrl" TO imgurl`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverting the column name back to "imgUrl"
        await queryRunner.query(`ALTER TABLE product RENAME COLUMN imgurl TO "imgUrl"`);
    }

}
