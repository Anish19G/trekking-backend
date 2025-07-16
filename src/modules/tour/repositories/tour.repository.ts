import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class TourRepository extends Repository<Tour> {
  constructor(private dataSource: DataSource) {
    super(Tour, dataSource.createEntityManager());
  }
}
