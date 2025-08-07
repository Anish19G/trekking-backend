import { PartialType } from '@nestjs/mapped-types';
import { CreateInclusionExclusionDto } from './create-inclusion-exclusion.dto';

export class UpdateInclusionExclusionDto extends PartialType(CreateInclusionExclusionDto) {}
