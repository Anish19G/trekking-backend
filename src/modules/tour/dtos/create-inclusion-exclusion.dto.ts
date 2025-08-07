import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { InclusionExclusionType } from '../enums/tour-enum';

export class CreateInclusionExclusionDto {
  @IsEnum(InclusionExclusionType)
  type: InclusionExclusionType;

  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNumber()
  tourDetailId: number;
}
