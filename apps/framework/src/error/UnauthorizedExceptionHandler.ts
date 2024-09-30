
import { ExceptionHandlerInterface } from "./ExceptionHandler.interface";
import { ArgumentsHost, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { ConvertDate } from "apps/common/src/model/ConvertDate";

export class UnauthorizedExceptionHandler implements ExceptionHandlerInterface{

  handleException(exception: Error,host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const err = exception as UnauthorizedException;
    const info = err.getResponse() as any
    const status= exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    let respObj:any = {
      code: info.statusCode, // HTTP状态码
      timestamp: new ConvertDate(new Date()).toISOString(),
      msg: info.message
    };
    if(process.env.NODE_ENV==="development"){
      respObj.path= request.url
      respObj.method=request.method
    }
    response.status(status).json(respObj);
  }
}
