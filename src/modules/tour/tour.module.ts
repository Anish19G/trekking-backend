import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Itinerary } from './entities/itinerary.entity';
import { Gallery } from './entities/gallery.entity';
import { Booking } from './entities/booking.entity';
import { Location } from './entities/location.entity';
import { Category } from './entities/tour-category.entity';


import { TourController } from './controllers/tour.controller';
import { ItineraryController } from './controllers/itinerary.controller';
import { BookingController } from './controllers/booking.controller';
import { LocationController } from './controllers/location.controller';
import { GalleryController } from './controllers/gallery.controller';
import { CategoryController } from './controllers/category.controller';



import { TourService } from './services/tour.service';
import { ItineraryService } from './services/itinerary.service';
import { BookingService } from './services/booking.service';
import { LocationService } from './services/location.service';
import { GalleryService } from './services/gallery.service';
import { CategoryService } from './services/category.service';


@Module({
  imports: [TypeOrmModule.forFeature([Tour, Itinerary, Gallery, Booking, Location, Category])],
  controllers: [TourController, ItineraryController, BookingController, LocationController, GalleryController, CategoryController],
  providers: [TourService, ItineraryService, BookingService, LocationService, GalleryService, CategoryService],
})
export class TourModule {}
