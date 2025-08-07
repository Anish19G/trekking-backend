import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number; // ID of the Category entity

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsOptional()
  locationId?: number; // ID of the Location entity

  @IsNumber()
  @IsOptional()
  detailId?: number; // ID of the TourDetail entity if pre-created
}
