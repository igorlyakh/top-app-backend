import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/configs/jwt.config';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{ name: 'auth', schema: AuthSchema }]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
	],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
