import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from "@nestjs/common";
import TypeORMDefault from './config/typeOrm/typeORMConfig';
import RedisDefault from "./config/redisConfig";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { GlobalErrorFilter } from "./error/GlobalErrorFilter";
import { CustomLogger } from "./config/CustomLogger";
import { TypeOrmOperateEventListener } from "./config/typeOrm/TypeOrmOperateEventListener";
import { AsyncLocalStorageInterceptor } from "./interceptor/AsyncLocalStorageInterceptor";
import I18nConfig from "./config/I18nConfig";
import { LogInterceptor } from "./interceptor/LogInterceptor";
import { SystemModule } from "apps/system/src/system.module";
@Module({
  imports: [
    TypeORMDefault,
    RedisDefault,
    I18nConfig,
    SystemModule
  ],
  controllers: [],
  providers: [

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:AsyncLocalStorageInterceptor
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LogInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
    {
      provide: 'Logger',
      useClass: CustomLogger,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DateFormatInterceptor,
    // },
    TypeOrmOperateEventListener,
  ],
  exports:[TypeORMDefault]
})
export class FrameworkModule {

}
