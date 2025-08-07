import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TourDetail } from './tour-detail.entity';

@Entity('galleries')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => TourDetail, (TourDetail) => TourDetail.images, { onDelete: 'CASCADE' })
  tourDetail: TourDetail;
}
