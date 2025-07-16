// modules/tour/services/gallery.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';
import { Tour } from '../entities/tour.entity';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { Express } from 'express'; 


@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepo: Repository<Gallery>,
    @InjectRepository(Tour)
    private tourRepo: Repository<Tour>,
  ) {}

  async create(dto: CreateGalleryDto, files: Express.Multer.File[]) {
    const tour = await this.tourRepo.findOne({ where: { id: dto.tourId } });
    if (!tour) throw new NotFoundException('Tour not found');

    const galleries = files.map((file) => {
      const gallery = this.galleryRepo.create({ imageUrl: file.filename, tour });
      return gallery;
    });

    return this.galleryRepo.save(galleries);
  }

  async findAll() {
    return this.galleryRepo.find({ relations: ['tour'] });
  }

  async remove(id: number) {
    const gallery = await this.galleryRepo.findOneBy({ id });
    if (!gallery) throw new NotFoundException('Gallery not found');
    return this.galleryRepo.remove(gallery);
  }
}
