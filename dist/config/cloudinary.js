"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.development.env' });
exports.cloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_KEY,
            api_secret: process.env.CLOUD_KEY_SECRET,
        });
    }
};
//# sourceMappingURL=cloudinary.js.map