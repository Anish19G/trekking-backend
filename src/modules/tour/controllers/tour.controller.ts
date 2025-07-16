import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TourService } from '../services/tour.service';
import { CreateTourDto } from '../dtos/create-tour.dto';
import { UpdateTourDto } from '../dtos/update-tour.dto';

@ApiTags('Tours')
@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a tour' })
  @ApiResponse({ status: 201, description: 'Tour created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() dto: CreateTourDto) {
    try {
      const tour = await this.tourService.create(dto);
      return {
        success: true,
        message: 'Tour created successfully',
        data: tour,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create tour');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all tours' })
  async findAll() {
    const tours = await this.tourService.findAll();
    return { success: true, data: tours };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tour by ID' })
  async findOne(@Param('id') id: number) {
    const tour = await this.tourService.findOne(id);
    return { success: true, data: tour };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tour' })
  async update(@Param('id') id: number, @Body() dto: UpdateTourDto) {
    const tour = await this.tourService.update(id, dto);
    return {
      success: true,
      message: 'Tour updated successfully',
      data: tour,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete tour' })
  async remove(@Param('id') id: number) {
    await this.tourService.remove(id);
  }
}
