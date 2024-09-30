// log.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors, Logger } from "@nestjs/common";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOG_METADATA, LogMetadata } from "apps/common/src/decorator/Log";
import { SysOperlogService } from "apps/system/src/service/SysOperlog.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name)
  constructor(
    private reflector: Reflector,
    private readonly loggerService: SysOperlogService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const log: LogMetadata = this.reflector.getAllAndOverride(LOG_METADATA,[context.getClass(),context.getHandler()]);
    let logData = {}
    if(log){
      logData = {
        title:log.title,
        businessType:log.businessType,
        method:context.getClass()?.name+'.'+context.getHandler()?.name,
        requestMethod:request.method,
        operatorType:'0',
        operName:request?.user?.user?.userName,
        deptName:request?.user?.user?.dept?.deptName,
        operUrl:request.url ,
        operIp:request.ip,
        operLocation:request?.user?.loginLocation,
        operParam:JSON.stringify(request.body),
        operTime:new Date(),
      }
    }
    const startTime = +new Date();
    return next.handle().pipe(
      tap({
        next: (response) => {
          if(log){
            //
            logData = {
              ...logData,
              jsonResult:JSON.stringify(response),
              status:response?.code == 200?"0":'1',
              errorMsg:"",
              costTime: ((+new Date()) - startTime) as number
            }
            this.loggerService.create(logData as any).catch(err=>this.logger.error(err));
          }
        },
        error: (error) => {
          if(log){
            logData = {
              ...logData,
              jsonResult:JSON.stringify(error),
              status:'1',
              errorMsg:error?.msg,
              costTime: ((+new Date()) - startTime) as number
            }
            this.loggerService.create(logData as any).catch(err=>this.logger.error(err));
          }
        },
      }),
    );
  }
}

export const LogInterceptorProvider = {
  provide: 'LOG_INTERCEPTOR',
  useClass: LogInterceptor,
};

export const UseLogInterceptor = () => UseInterceptors(LogInterceptor);
