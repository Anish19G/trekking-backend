import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Tour } from './tour.entity';
import { Gallery } from './gallery.entity';
import { Itinerary } from './itinerary.entity';
import { TourInfo } from './tour-info.entity';
import { InclusionExclusion } from './inclusion-exclusion.entity';


@Entity('tour_details')
export class TourDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Tour, tour => tour.detail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tourId' })
    tour: Tour;

    title: string;

    description: string;


    @OneToOne(() => TourInfo, info => info.tourDetail, {
        cascade: true, // this allows TourInfo to be created/updated/deleted along with TourDetail
        eager: true,
    })
    @JoinColumn({ name: 'tourDetailId' })
    tourInfo: TourInfo;

    @Column('text')
    highlights: string;

    @OneToMany(() => InclusionExclusion, item => item.tourDetail, {
        cascade: true,         // Automatically persist/remove children when TourDetail is saved/removed
        onDelete: 'CASCADE'    // Optional: This doesn't actually affect OneToMany; needs to be on ManyToOne
    })
    inclusionsExclusions: InclusionExclusion[];


    @Column({ type: 'text', nullable: true })
    mapEmbedUrl: string;

    @OneToMany(() => Gallery, image => image.tourDetail, { cascade: true, onDelete: 'CASCADE' })
    images: Gallery[];



    @OneToOne(() => Itinerary, itinerary => itinerary.tourDetail, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'itineraryId' })  // Optional: name FK column
    itinerary: Itinerary;
}
export { Tour };

