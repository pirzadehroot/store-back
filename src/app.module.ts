import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { CategoriesModule } from './modules/admin/categories/categories.module';
import { ProductsModule } from './modules/admin/products/products.module';
import { productsEntity } from './entities/products.entity';
import { ShopModule } from './modules/shop/shop.module';
import usersEntity from './entities/users.entity';
import { categoriesEntity } from './entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sina_dev',
      password: 'Dev8090100',
      database: 'shop_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([productsEntity, usersEntity, categoriesEntity]),
    UsersModule,
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
