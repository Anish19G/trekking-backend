import { IsNotEmpty, IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateGalleryDto {
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  tourDetailId: number;
}
