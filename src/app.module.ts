import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/admin/categories/categories.module';
import { ProductsModule } from './modules/admin/products/products.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductEntity } from './entities/products.entity';
import { CategoryEntity } from './entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sina_dev',
      password: 'Dev8090100',
      database: 'shop-db-pg12',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    CategoriesModule,
    ProductsModule,
    ShopModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
