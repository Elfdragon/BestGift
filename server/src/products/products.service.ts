import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(title: string, description: string, price: number, image: string) {
    const newProduct = new this.productModel({ title, description, price, image });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      image: prod.image
    })) as Product[];
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
    image: string
  ) {
    const updatedProduct = await this.findProduct(id);
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (image) updatedProduct.image = image;

    await updatedProduct.save();
    return null;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if(result.deletedCount === 0) throw new NotFoundException('Product not found.');
  }

  private async findProduct(id): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Product not found.');
    }
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }
}
