import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express'; 
import { Location } from '../entities/location.entity';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { UpdateLocationDto } from '../dtos/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(dto: CreateLocationDto, file: Express.Multer.File) {
    const location = this.locationRepo.create(dto);
    if (file) {
      location.imageUrl = `uploads/${file.filename}`;
    }
    return await this.locationRepo.save(location);
  }

  findAll() {
    return this.locationRepo.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepo.findOne({ where: { id } });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async update(id: number, dto: UpdateLocationDto, file?: Express.Multer.File) {
    const location = await this.findOne(id);
    Object.assign(location, dto);
    if (file) {
      location.imageUrl = `uploads/${file.filename}`;
    }
    return this.locationRepo.save(location);
  }

  async remove(id: number) {
    const location = await this.findOne(id);
    return this.locationRepo.remove(location);
  }
}
