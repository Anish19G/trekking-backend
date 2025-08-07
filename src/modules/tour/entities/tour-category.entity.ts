import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tour } from './tour.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Tour, (tour) => tour.category)
  tour: Tour[];
}
