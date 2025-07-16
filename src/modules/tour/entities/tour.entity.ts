import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { Gallery } from './gallery.entity';
import { Booking } from './booking.entity';
import { Location } from './location.entity';


@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  overview: string;

  @Column('text')
  tourInfo: string;

  @Column('text')
  highlights: string;

  @Column()
  category: string; // History, Culture, etc.

  @Column()
  duration: string; // e.g., "5 Days"

  @Column('decimal')
  price: number;

  @Column('decimal')
  rating: number;

  @Column('text')
  inclusion: string;

  @Column('text')
  exclusion: string;

  @Column()
  mapEmbedUrl: string;

  @OneToMany(() => Itinerary, itinerary => itinerary.tour)
  itinerary: Itinerary[];

  @OneToMany(() => Gallery, (gallery) => gallery.tour, { cascade: true })
  gallery: Gallery[];

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];

  @ManyToOne(() => Location, location => location.tours)
  location: Location;

}