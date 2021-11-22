import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new Error('Passwords must match.');
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      confirmPassword,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({email: email})
    if(!user) throw new NotFoundException('User not found.');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid password.');

    return {id: user.id, isAdmin: user.isAdmin};
  }
}
