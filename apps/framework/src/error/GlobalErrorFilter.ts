
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus, Logger
} from "@nestjs/common";
import { ErrorExceptionDispatcher } from "./ErrorExceptionDispatcher";
import { AsyncStore } from "apps/common/src/utils/AsyncStore";

@Catch(Error)
export class GlobalErrorFilter implements ExceptionFilter {

  private readonly logger = new Logger(GlobalErrorFilter.name)

  catch(exception: Error, host: ArgumentsHost) {
    const store = AsyncStore.getStore();
    const continueStore = (exception as any)._store_
    // continue AsyncStore context
    AsyncStore.run(store || continueStore,()=>{
      this.logger.error(exception);
      const handler = ErrorExceptionDispatcher.getHandler(exception);
      handler.handleException(exception,host);
    })

  }
}
