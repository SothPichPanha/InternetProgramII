import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsService } from './receipts/receipts.service';
import { Receipt } from './database/entities/receipts.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

// GraphQL imports
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CategoriesModule } from './category/category.module';
import { GraphqlModule } from './graphql/graphql.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ load .env

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),

    TypeOrmModule.forFeature([Receipt]),

    NotificationsModule,

    ReceiptsModule,

    OrdersModule,

    CoreModule,

    CategoriesModule,

     // enableGraphQL - schema-first approach
     GraphQLModule.forRoot<ApolloDriverConfig>({
       driver: ApolloDriver,
      //  typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
     }),

     GraphqlModule,

   ],
  controllers: [AppController, ReceiptsController],
  providers: [AppService, ReceiptsService],
})
export class AppModule {}