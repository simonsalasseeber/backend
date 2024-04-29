"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCategoriesMigration1623059200000 = void 0;
class AddCategoriesMigration1623059200000 {
    async up(queryRunner) {
        const categories = ['smartphone', 'monitor', 'keyboard', 'mouse'];
        for (const category of categories) {
            await queryRunner.query(`INSERT INTO category (name) VALUES ('${category}')`);
        }
    }
    async down(queryRunner) {
        const categories = ['smartphone', 'monitor', 'keyboard', 'mouse'];
        for (const category of categories) {
            await queryRunner.query(`DELETE FROM category WHERE name = '${category}'`);
        }
    }
}
exports.AddCategoriesMigration1623059200000 = AddCategoriesMigration1623059200000;
//# sourceMappingURL=1714384516444-AddCategories.js.map