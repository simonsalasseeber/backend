/// <reference types="multer" />
import { UploadApiResponse } from "cloudinary";
export declare class CloudRepository {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
