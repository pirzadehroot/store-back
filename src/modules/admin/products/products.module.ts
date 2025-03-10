import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productEntity } from '../../../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([productEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
