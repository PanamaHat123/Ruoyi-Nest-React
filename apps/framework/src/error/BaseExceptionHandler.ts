
import { ExceptionHandlerInterface } from "./ExceptionHandler.interface";
import { ArgumentsHost, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { ConvertDate } from "apps/common/src/model/ConvertDate";

export class BaseExceptionHandler implements ExceptionHandlerInterface{

  handleException(exception: Error,host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status= exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    let respObj:any = {
      code: status, // HTTP状态码
      timestamp: new ConvertDate(new Date()).toISOString(),
      msg: exception instanceof HttpException ? (exception.getResponse() as any)?.message : (exception.message||'Internal server error'),
    };
    if(process.env.NODE_ENV==="development"){
      respObj.path= request.url
      respObj.method=request.method
    }
    response.status(respObj.status|| HttpStatus.INTERNAL_SERVER_ERROR).json(respObj);
  }
}
