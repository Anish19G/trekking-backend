// modules/tour/controllers/gallery.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express'; 


@Controller('galleries')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateGalleryDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.galleryService.create(dto, files.images || []);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.galleryService.remove(id);
  }
}
