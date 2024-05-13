import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { ProductModel } from 'src/product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true, versionKey: false, _id: true })
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'product' })
	productId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
