import { ExceptionHandlerInterface } from "./ExceptionHandler.interface";
import { UnauthorizedExceptionHandler } from "./UnauthorizedExceptionHandler";
import { BaseExceptionHandler } from "./BaseExceptionHandler";
import { ValidationExceptionHandler } from "./ValidationExceptionHandler";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";


export class ErrorExceptionDispatcher {

  static handlerMap:Map<String,ExceptionHandlerInterface> = new Map()
  static {
    ErrorExceptionDispatcher.handlerMap.set(UnauthorizedException.name,new UnauthorizedExceptionHandler())
    ErrorExceptionDispatcher.handlerMap.set(BadRequestException.name,new ValidationExceptionHandler())
  }

  static getHandler(exception: Error):ExceptionHandlerInterface{
    const handler = ErrorExceptionDispatcher.handlerMap.get(exception.name);
    if(handler)return handler
    return new BaseExceptionHandler()
  }

}