import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tour } from './tour.entity';

@Entity('galleries')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Tour, (tour) => tour.gallery, { onDelete: 'CASCADE' })
  tour: Tour;
}
