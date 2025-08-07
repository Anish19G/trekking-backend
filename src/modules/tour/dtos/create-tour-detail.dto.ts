import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTourInfoDto } from './create-tour-info.dto';
import { CreateInclusionExclusionDto } from './create-inclusion-exclusion.dto';
import { CreateGalleryDto } from './create-gallery.dto';
import { CreateItineraryDto } from './create-itinerary.dto';

export class CreateTourDetailDto {
  @IsNumber()
  @IsNotEmpty()
  tourId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  highlights: string;

  @IsString()
  @IsOptional()
  mapEmbedUrl?: string;

  @ValidateNested()
  @Type(() => CreateTourInfoDto)
  @IsOptional()
  tourInfo?: CreateTourInfoDto;

  @ValidateNested({ each: true })
  @Type(() => CreateInclusionExclusionDto)
  @IsOptional()
  inclusionsExclusions?: CreateInclusionExclusionDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateGalleryDto)
  @IsOptional()
  images?: CreateGalleryDto[];

  @ValidateNested()
  @Type(() => CreateItineraryDto)
  @IsOptional()
  itinerary?: CreateItineraryDto;
}
