import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from '../src/auth/auth.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const login: AuthDto = {
	email: 'test@mail.com',
	password: '123123',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login - GOOD', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(login)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.accessToken).toBeDefined();
			});
	});

	it('/auth/login - BAD LOGIN', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...login, email: 'test22@mail.com' })
			.expect(401, {
				message: USER_NOT_FOUND_ERROR,
				error: 'Unauthorized',
				statusCode: 401,
			});
	});

	it('/auth/login - BAD PASSWORD', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...login, password: '111111' })
			.expect(401, {
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized',
				statusCode: 401,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
