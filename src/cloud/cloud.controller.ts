import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudService } from './cloud.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('cloud')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {}

@Post('uploadImage/:id')
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file')) // in the form field, i receive a 'file' name, and the image
async uploadImage(
    @Param(':id') productId: string,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: "File is too heavy. Maximum size is 200kb"
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)$/
                })
            ]
        })
    ) file: Express.Multer.File,
) {
    return this.cloudService.uploadImage(file, productId)
}

}