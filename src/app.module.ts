import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AuthController, UserController, RolesController, ProductController, LikeProductController, PaymentController, OrderItemsController, OrderController } from './controllers';
import { AuthService, UserService, RoleService, ProductService, LikeProductService, PaymentService, OrderItemService, OrderService } from './services';
import { LocalStrategy, JwtStrategy, RolesGuard } from './common';
import { Enviroment } from './models';
import { getEnv } from './environment';
import { User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product } from './entity';
import { MessagesModule } from './messages/messages.module';

const Env: Enviroment = getEnv();
config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_DATABASE_HOST'),
        port: 5432,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE_NAME'),
        entities: [User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, LikeProduct, Role, UserInRole, Order, OrderItem, Payment, Product]),
    PassportModule,
    JwtModule.register({
      secret: Env.tokenSecret,
      signOptions: { expiresIn: Env.tokenLife },
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req })
    }),
    MessagesModule,
  ],
  controllers: [AppController, AuthController, UserController, RolesController, ProductController, LikeProductController, PaymentController, OrderItemsController, OrderController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService, RoleService, ProductService, LikeProductService, PaymentService, OrderItemService, OrderService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule {}
