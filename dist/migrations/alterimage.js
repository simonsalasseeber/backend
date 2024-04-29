"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeImgUrlToImgurl1714391142827 = void 0;
class ChangeImgUrlToImgurl1714391142827 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE product RENAME COLUMN "imgUrl" TO imgurl`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE product RENAME COLUMN imgurl TO "imgUrl"`);
    }
}
exports.ChangeImgUrlToImgurl1714391142827 = ChangeImgUrlToImgurl1714391142827;
//# sourceMappingURL=alterimage.js.map