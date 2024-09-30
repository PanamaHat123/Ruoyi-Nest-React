import { ArgumentsHost } from "@nestjs/common";

export interface ExceptionHandlerInterface {

   handleException(exception: Error,host: ArgumentsHost);

}