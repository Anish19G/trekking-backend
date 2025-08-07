import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTourInfoDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  placeCovered: string;

  @IsString()
  @IsNotEmpty()
  startpoint: string;

  @IsString()
  @IsNotEmpty()
  endPoint: string;
}
