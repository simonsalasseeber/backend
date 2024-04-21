"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrderDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class addOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, productIds: { required: true, type: () => [String] } };
    }
}
exports.addOrderDto = addOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required.' }),
    (0, class_validator_1.IsString)({ message: 'User ID must be a string.' }),
    __metadata("design:type", String)
], addOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product IDs are required.' }),
    (0, class_validator_1.IsArray)({ message: 'Product IDs must be an array.' }),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Product IDs array cannot be empty.' }),
    (0, class_validator_1.ArrayUnique)({ message: 'Product IDs must be unique.' }),
    __metadata("design:type", Array)
], addOrderDto.prototype, "productIds", void 0);
//# sourceMappingURL=orders.dto.js.map