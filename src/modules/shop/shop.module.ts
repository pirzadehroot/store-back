import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from '../../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([productsEntity])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
