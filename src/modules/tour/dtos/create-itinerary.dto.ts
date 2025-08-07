import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateItineraryDto {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  tourDetailId: number;
}
