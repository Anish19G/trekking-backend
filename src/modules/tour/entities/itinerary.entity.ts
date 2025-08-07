import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { TourDetail } from './tour-detail.entity';

@Entity('itineraries')
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column({ nullable: true })
  title: string;

  @Column('text')
  description: string;

  @OneToOne(() => TourDetail, TourDetail => TourDetail.itinerary, { onDelete: 'CASCADE' })
  tourDetail: TourDetail;
  
}