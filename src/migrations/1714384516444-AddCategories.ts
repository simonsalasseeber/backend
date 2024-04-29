import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoriesMigration1623059200000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categories = ['smartphone', 'monitor', 'keyboard', 'mouse']; // Aquí puedes añadir las categorías que necesites

        for (const category of categories) {
            await queryRunner.query(`INSERT INTO category (name) VALUES ('${category}')`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const categories = ['smartphone', 'monitor', 'keyboard', 'mouse']; // Asegúrate de que estas categorías coincidan con las añadidas en el método up

        for (const category of categories) {
            await queryRunner.query(`DELETE FROM category WHERE name = '${category}'`);
        }
    }

}
