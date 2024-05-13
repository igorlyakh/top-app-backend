import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
	};
};

const getMongoString = (configService: ConfigService) => {
	return configService.get('DB_HOST');
};
