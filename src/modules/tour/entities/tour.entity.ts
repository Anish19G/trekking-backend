import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from './location.entity';
import { TourDetail } from './tour-detail.entity';
import { Category } from './tour-category.entity';
@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  review: string;

  @ManyToOne(() => Category, category => category.tour)
  category: Category;

  @Column()
  duration: string; 

  @Column('decimal')
  price: number;

  @Column('decimal')
  rating: number;

  @ManyToOne(() => Location, location => location.tours, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @OneToOne(() => TourDetail, detail => detail.tour)
  detail: TourDetail;

}