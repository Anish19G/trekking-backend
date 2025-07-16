// src/modules/tour/controllers/itinerary.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ItineraryService } from '../services/itinerary.service';
import { CreateItineraryDto } from '../dtos/create-itinerary.dto';
import { UpdateItineraryDto } from '../dtos/update-itinerary.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Itinerary')
@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create itinerary' })
  @ApiResponse({ status: 201, description: 'Itinerary created' })
  async create(@Body() dto: CreateItineraryDto) {
    const itinerary = await this.itineraryService.create(dto);
    return {
      success: true,
      message: 'Itinerary created successfully',
      data: itinerary,
    };
  }

  @Get('tour/:tourId')
  @ApiOperation({ summary: 'Get all itineraries for a tour' })
  async findAllByTour(@Param('tourId', ParseIntPipe) tourId: number) {
    const itineraries = await this.itineraryService.findAllByTour(tourId);
    return { success: true, data: itineraries };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get itinerary by id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const itinerary = await this.itineraryService.findOne(id);
    return { success: true, data: itinerary };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update itinerary' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItineraryDto,
  ) {
    const updated = await this.itineraryService.update(id, dto);
    return { success: true, message: 'Itinerary updated', data: updated };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete itinerary' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.itineraryService.remove(id);
    return { success: true, message: 'Itinerary deleted' };
  }
}
