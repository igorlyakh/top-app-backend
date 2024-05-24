import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductDocument } from './product.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel('product')
		private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
