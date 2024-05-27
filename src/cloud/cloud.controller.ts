import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudService } from './cloud.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cloud')
@Controller('cloud')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {}

@ApiBearerAuth()
@Post('uploadImage/:id')
@ApiOperation({ summary: 'Upload product image' })
@ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file')) // in the form field, i receive a 'file' name, and the image
async uploadImage(
    @Param('id', new ParseUUIDPipe()) productId: string,
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
    return this.cloudService.uploadImage(productId, file)
}

}