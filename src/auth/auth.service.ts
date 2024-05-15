import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { AuthDocument } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('auth') private readonly authModel: Model<AuthDocument>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const passwordHash = await hash(dto.password, 10);
		const newUser = { email: dto.email, passwordHash };
		return this.authModel.create(newUser);
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec();
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<Pick<AuthDocument, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return {
			email: user.email,
		};
	}

	async login(email: string) {
		const payload = { email };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}
}
