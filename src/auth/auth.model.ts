import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AuthModel>;

@Schema({ timestamps: true, versionKey: false, _id: true })
export class AuthModel {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	passwordHas: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
