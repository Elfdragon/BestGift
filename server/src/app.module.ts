import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://Elfdragon17:Asdfpassword1@cluster0.7ql0n.mongodb.net/BestGift?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
