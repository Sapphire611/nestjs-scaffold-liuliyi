import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('45 * * * * *', {
    name: 'schedule1',
    timeZone: 'Asia/Shanghai',
    utcOffset: '+08:00',
    disabled: true,
  })
  handleCron1() {
    this.logger.debug('Called when second = 45');
  }

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'schedule2',
    disabled: true,
  })
  // @Interval(10000) // the same as above
  // @Interval('schedule2', 10000)
  handleCron2() {
    this.logger.debug('Called EVERY_10_SECONDS');
  }

  @Cron(new Date(Date.now() + 3 * 1000), {
    name: 'schedule3',
    disabled: false,
  })
  // @Timeout(3000)
  handleCron3() {
    const job: CronJob = this.schedulerRegistry.getCronJob('schedule3');
    // this.logger.debug(job.running);
  }
}
