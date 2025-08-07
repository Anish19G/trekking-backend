import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { TourDetail } from './tour-detail.entity';

@Entity('tour_info')
export class TourInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: string;

    @Column()
    placeCovered: string;

    @Column()
    startpoint: string;

    @Column()
    endPoint: string;

    @OneToOne(() => TourDetail, detail => detail.tourInfo, {
        onDelete: 'SET NULL' // or 'NO ACTION'
    })
    tourDetail: TourDetail;

}
