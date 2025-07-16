import { IsString, IsNumber } from 'class-validator';

export class CreateTourDto {
  @IsString()
  title: string;

  @IsString()
  overview: string;

  @IsString()
  tourInfo: string;

  @IsString()
  highlights: string;

  @IsString()
  category: string;

  // change location to locationId which should be a number (or string if your PK is string)
  @IsNumber()
  locationId: number;

  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsNumber()
  rating: number;

  @IsString()
  inclusion: string;

  @IsString()
  exclusion: string;

  @IsString()
  mapEmbedUrl: string;
}
