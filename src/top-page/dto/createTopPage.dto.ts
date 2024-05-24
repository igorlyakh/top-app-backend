import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantages {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@Type(() => HhData)
	hh?: HhData;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantages)
	advantages: TopPageAdvantages[];

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
