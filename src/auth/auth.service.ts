import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { AuthDocument } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('auth') private readonly authModel: Model<AuthDocument>,
	) {}

	async createUser(dto: AuthDto) {
		const passwordHash = await hash(dto.password, 10);
		const newUser = { email: dto.email, passwordHash };
		return this.authModel.create(newUser);
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec();
	}
}
