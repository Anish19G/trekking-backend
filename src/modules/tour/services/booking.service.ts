import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Tour } from '../entities/tour.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,

    @InjectRepository(Tour)
    private tourRepo: Repository<Tour>,
  ) {}

  async create(dto: CreateBookingDto) {
    const tour = await this.tourRepo.findOneBy({ id: dto.tourId });
    if (!tour) throw new NotFoundException('Tour not found');

    const basePrice = tour.price;
    const discount = dto.discount ?? 0;
    const tax = dto.tax ?? 0;

    const payableNow = basePrice - discount + tax;

    const booking = this.bookingRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      checkIn: dto.checkIn,
      checkOut: dto.checkOut,
      basePrice,
      discount,
      tax,
      payableNow,
      tour,
    });

    return await this.bookingRepo.save(booking);
  }

  async findAll() {
    return this.bookingRepo.find({ relations: ['tour'] });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['tour'],
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async remove(id: number) {
    const result = await this.bookingRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return { message: 'Booking deleted successfully' };
  }
}
