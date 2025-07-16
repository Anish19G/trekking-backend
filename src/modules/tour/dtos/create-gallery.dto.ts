// modules/tour/dtos/create-gallery.dto.ts
import { IsNumber } from 'class-validator';

export class CreateGalleryDto {
  @IsNumber()
  tourId: number;
}
