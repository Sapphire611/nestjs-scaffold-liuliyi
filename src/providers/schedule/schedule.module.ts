import { Module } from '@nestjs/common';
import { ScheduleModule as scheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [scheduleModule.forRoot()],
  providers: [ScheduleService],
})
export class ScheduleModule {}
