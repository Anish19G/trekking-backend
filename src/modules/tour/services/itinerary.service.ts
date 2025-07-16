// src/modules/tour/services/itinerary.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItineraryRepository } from '../repositories/itinerary.repository';
import { Itinerary } from '../entities/itinerary.entity';
import { CreateItineraryDto } from '../dtos/create-itinerary.dto';
import { UpdateItineraryDto } from '../dtos/update-itinerary.dto';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class ItineraryService {
    constructor(
        @InjectRepository(Itinerary)
        private readonly itineraryRepo: Repository<Itinerary>, // or ItineraryRepository if you have custom repo
        @InjectRepository(Tour)
        private readonly tourRepo: Repository<Tour>,
    ) { }

    async create(dto: CreateItineraryDto) {
        const tour = await this.tourRepo.findOneBy({ id: dto.tourId });
        if (!tour) throw new Error('Tour not found');

        const itineraries = dto.itineraries.map((item) => {
            const itinerary = this.itineraryRepo.create(item);
            itinerary.tour = tour;
            return itinerary;
        });

        return await this.itineraryRepo.save(itineraries);
    }

    async findAllByTour(tourId: number): Promise<Itinerary[]> {
        return this.itineraryRepo.find({
            where: { tour: { id: tourId } },
        });
    }

    async findOne(id: number): Promise<Itinerary> {
        const itinerary = await this.itineraryRepo.findOne({
            where: { id },
            relations: ['tour'],
        });
        if (!itinerary) throw new NotFoundException('Itinerary not found');
        return itinerary;
    }

    async update(id: number, dto: UpdateItineraryDto): Promise<Itinerary> {
        const itinerary = await this.findOne(id);
        Object.assign(itinerary, dto);
        if (dto.tourId) {
            const tour = await this.tourRepo.findOneBy({ id: dto.tourId });
            if (!tour) throw new NotFoundException('Tour not found');

            itinerary.tour = tour;
        }
        Object.assign(itinerary, dto);

        return this.itineraryRepo.save(itinerary);
    }

    async remove(id: number): Promise<void> {
        const itinerary = await this.findOne(id);
        await this.itineraryRepo.remove(itinerary);
    }
}
