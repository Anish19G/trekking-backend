import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TourDetail } from './tour-detail.entity';
import { InclusionExclusionType } from '../enums/tour-enum';

@Entity('inclusion_exclusion')
export class InclusionExclusion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: InclusionExclusionType })
    type: InclusionExclusionType;


    @Column()
    item: string;

    @ManyToOne(() => TourDetail, detail => detail.inclusionsExclusions, {
        onDelete: 'CASCADE',   // This ensures that when TourDetail is deleted, all InclusionExclusion rows are too
        nullable: false
    })
    @JoinColumn({ name: 'tourDetailId' }) // Optional: sets the FK column name
    tourDetail: TourDetail;

}
