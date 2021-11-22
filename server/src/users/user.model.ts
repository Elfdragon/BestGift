import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {type: Boolean, default: false},
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  cart: { items: [{ productId: string; quantity: number }] };
}
