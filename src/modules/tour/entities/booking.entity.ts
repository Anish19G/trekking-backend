import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Tour } from './tour.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column('decimal')
  basePrice: number;

  @Column('decimal', { default: 0 })
  discount: number;

  @Column('decimal', { default: 0 })
  tax: number;

  @Column('decimal')
  payableNow: number;

  @ManyToOne(() => Tour, (tour) => tour.bookings, { onDelete: 'CASCADE' })
  tour: Tour;

  @CreateDateColumn()
  createdAt: Date;
}
