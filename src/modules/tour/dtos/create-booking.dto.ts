// src/modules/booking/dtos/create-booking.dto.ts
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsDateString,
    IsNumber,
} from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phoneNumber: string;

    @IsDateString()
    checkIn: string;

    @IsDateString()
    checkOut: string;

    @IsNumber()
    tourId: number;

    discount?: number;
    tax?: number;

}
