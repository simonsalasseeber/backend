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
exports.UserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const checkPassword_decorator_1 = require("../decorators/checkPassword.decorator");
class UserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, isAdmin: { required: false, type: () => Boolean }, name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$/" }, confirmPassword: { required: true, type: () => String }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String, minLength: 5, maxLength: 20 }, city: { required: true, type: () => String, minLength: 5, maxLength: 20 } };
    }
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotIn)([true], { message: 'isAdmin property is not allowed' }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isAdmin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        description: "The name of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 15),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    }),
    (0, swagger_1.ApiProperty)({
        description: "The password of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(checkPassword_decorator_1.checkPassword, ['password']),
    (0, swagger_1.ApiProperty)({
        description: "The confirmed password of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        description: "The adress of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "The phne of the user"
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        description: "The country of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        description: "The city of the user"
    }),
    __metadata("design:type", String)
], UserDto.prototype, "city", void 0);
//# sourceMappingURL=users.dto.js.map