import { config } from '@/config';
import { Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';

export class MqttService {
  private client: mqtt.MqttClient;
  private topic: string;

  constructor() {
    this.topic = 'test1';
  }
  
  async open() {
    this.client = mqtt.connect(config.mqtt, {
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
      protocol: 'mqtt',
    });

    this.client.on('connect', () => {
      Logger.log('mqtt Connected ,url = ' + config.mqtt);

      // 只有订阅的topic才会接收到消息
      this.client.subscribe(this.topic, { qos: 1 }, () => {
        Logger.log(`mqtt Subscribe to topic '${this.topic}'`);
      });
    });

    this.client.on('disconnect', () => {
      Logger.error('disconnect mqtt ');
    });

    this.client.on('error', err => {
      Logger.error(`mqtt connect error, url = ${config.mqtt}`);
    });

    // 获取监听的mqtt信息并处理业务
    this.client.on('message', (topic, buffer) => {
      try {
        let message = buffer.toString();
        Logger.debug(`mqtt receive message, topic=${topic}, message=${message}`);
      } catch (err) {
        console.error(err);
      }
    });
  }

  publish(topic: string, event: string) {
    if (!topic || !event) return;
    let payload = JSON.stringify(event);

    if (this.client.connected) {
      this.client.publish(topic, payload, { qos: 1 });
      Logger.debug(`mqtt publish success, topic=${topic}, payload=${payload}`);
    } else {
      Logger.debug(`publish fail beacause backend mqtt disconnected, topic=${topic}, payload=${payload}`);
    }
  }
}
