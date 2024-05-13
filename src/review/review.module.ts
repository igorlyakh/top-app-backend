import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.model';

@Module({
	controllers: [ReviewController],
	imports: [
		MongooseModule.forFeature([
			{
				name: 'review',
				schema: ReviewSchema,
			},
		]),
	],
})
export class ReviewModule {}
