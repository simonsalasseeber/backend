import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudRepository {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return await new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                {resource_type: 'auto'},
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }

                }
            );
            toStream(file.buffer).pipe(upload)
        })
    }
}
// turns buffer to stream
// returns what i will upload to DB