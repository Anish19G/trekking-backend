import { IsNumber, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class ItineraryItem {
    @IsString()
    day: string;

    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class CreateItineraryDto {
    @IsNumber()
    tourId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItineraryItem)
    itineraries: ItineraryItem[];
}
