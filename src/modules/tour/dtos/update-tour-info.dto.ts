import { PartialType } from '@nestjs/mapped-types';
import { CreateTourInfoDto } from './create-tour-info.dto';

export class UpdateTourInfoDto extends PartialType(CreateTourInfoDto) {}
