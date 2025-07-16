import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tour } from './tour.entity';

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

  @ManyToOne(() => Tour, tour => tour.itinerary, { onDelete: 'CASCADE' })
  tour: Tour;
}