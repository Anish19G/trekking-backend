import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';
import { Location } from '../entities/location.entity'; 

import { CreateTourDto } from '../dtos/create-tour.dto';
import { UpdateTourDto } from '../dtos/update-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepo: Repository<Tour>,

    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(dto: CreateTourDto) {
    const location = await this.locationRepo.findOneBy({ id: dto.locationId });
    if (!location) throw new NotFoundException('Location not found');

    const tour = this.tourRepo.create({
      ...dto,
      location, // relation
    });

    return this.tourRepo.save(tour);
  }

  async findAll() {
    return this.tourRepo.find({
      relations: ['itinerary', 'gallery', 'bookings', 'location'],
    });
  }

  async findOne(id: number) {
    const tour = await this.tourRepo.findOne({
      where: { id },
      relations: ['itinerary', 'gallery', 'bookings', 'location'],
    });
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async update(id: number, dto: UpdateTourDto) {
    const tour = await this.tourRepo.findOneBy({ id });
    if (!tour) throw new NotFoundException('Tour not found');

    if (dto.locationId) {
      const location = await this.locationRepo.findOneBy({ id: dto.locationId });
      if (!location) throw new NotFoundException('Location not found');
      tour.location = location;
    }

    const updated = Object.assign(tour, dto);
    return this.tourRepo.save(updated);
  }

  async remove(id: number) {
    const result = await this.tourRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Tour not found');
  }
}
