import { RedisModule } from "@nestjs-modules/ioredis";
import * as config from 'config'

export default  RedisModule.forRoot({
    type: 'single',
    options: {
      host: config.get('redis.host'),
      port: config.get('redis.port'),
      password: config.get('redis.password'),
      db: config.get('redis.db'),
    },
  })