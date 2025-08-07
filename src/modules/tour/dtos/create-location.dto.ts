import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  shortDes?: string;

  @IsString()
  @IsOptional()
  toursSummary?: string;
}
