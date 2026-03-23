import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsService } from './receipts/receipts.service';
import { Receipt } from './database/entities/receipts.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ load .env

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1',
      database: process.env.DB_NAME || 'tp02',
      autoLoadEntities: true, // 🔥 cleaner
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),

    TypeOrmModule.forFeature([Receipt]),
  ],
  controllers: [AppController, ReceiptsController],
  providers: [AppService, ReceiptsService],
})
export class AppModule {}