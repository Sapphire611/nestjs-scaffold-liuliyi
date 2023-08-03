import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';

@ApiTags('File 文件相关')
@Controller('/api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: '文件上传',
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
