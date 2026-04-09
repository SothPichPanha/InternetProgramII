import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';


@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}