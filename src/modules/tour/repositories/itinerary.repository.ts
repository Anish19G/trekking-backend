// src/modules/tour/repositories/itinerary.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Itinerary } from '../entities/itinerary.entity';

@EntityRepository(Itinerary)
export class ItineraryRepository extends Repository<Itinerary> {}
