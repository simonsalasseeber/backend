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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloud_service_1 = require("./cloud.service");
const auth_guards_1 = require("../auth/guards/auth.guards");
const swagger_1 = require("@nestjs/swagger");
let CloudController = class CloudController {
    constructor(cloudService) {
        this.cloudService = cloudService;
    }
    async uploadImage(productId, file) {
        return this.cloudService.uploadImage(productId, file);
    }
};
exports.CloudController = CloudController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('uploadImage/:id'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: require("../entities/products.entity").Product }),
    __param(0, (0, common_1.Param)(':id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200000,
                message: "File is too heavy. Maximum size is 200kb"
            }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/
            })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CloudController.prototype, "uploadImage", null);
exports.CloudController = CloudController = __decorate([
    (0, swagger_1.ApiTags)('cloud'),
    (0, common_1.Controller)('cloud'),
    __metadata("design:paramtypes", [cloud_service_1.CloudService])
], CloudController);
//# sourceMappingURL=cloud.controller.js.map