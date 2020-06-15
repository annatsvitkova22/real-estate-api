import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthController, UserController, RolesController, ProductController, LikeProductController, PaymentController, OrderItemsController } from './controllers';
import { AuthService, UserService, RoleService, ProductService, LikeProductService, PaymentService, OrderItemService } from './services';
import { LocalStrategy, JwtStrategy } from './common';
import { Enviroment } from './models';
import { getEnv } from './environment';
import { User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product } from './entity';

const Env: Enviroment = getEnv();

const {
  DB_PASSWORD,
  DB_USERNAME,
  DB_DATABASE_NAME,
  DB_DATABASE_HOST
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_DATABASE_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE_NAME,
      entities: [User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product]),
    PassportModule,
    JwtModule.register({
      secret: Env.tokenSecret,
      signOptions: { expiresIn: Env.tokenLife },
    }),
  ],
  controllers: [AppController, AuthController, UserController, RolesController, ProductController, LikeProductController, PaymentController, OrderItemsController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService, RoleService, ProductService, LikeProductService, PaymentService, OrderItemService]
})
export class AppModule {}
