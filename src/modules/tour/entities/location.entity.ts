import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tour } from './tour.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string; // For tour5 or image path

  @Column({ nullable: true })
  link: string; // e.g. "tour-name"

  @Column({ nullable: true, type: 'text' })
  shortDes: string;

  // Optional: store a cached count summary if needed, else compute on the fly
  @Column({ nullable: true })
  toursSummary: string;

  @OneToMany(() => Tour, tour => tour.location)
  tours: Tour[];
}
