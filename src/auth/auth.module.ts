import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { getJWTConfig } from 'src/configs/jwt.config';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.model';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{ name: 'auth', schema: AuthSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	providers: [AuthService],
})
export class AuthModule {}
