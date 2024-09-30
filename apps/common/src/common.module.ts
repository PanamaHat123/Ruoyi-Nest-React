import { Global, Module } from "@nestjs/common";
import { RedisUtil } from "./utils/Redis.tool";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [RedisUtil],
  exports:[RedisUtil]
})
export class CommonModule {}
