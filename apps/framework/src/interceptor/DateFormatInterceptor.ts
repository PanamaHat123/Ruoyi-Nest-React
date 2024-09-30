import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const moment = require("moment")

// cancellation
// too Cost performance

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return deepConvertDatesToStrings(data);
      }),
    );
  }
}

function deepConvertDatesToStrings(obj) {
  // 判断是否是日期对象
  function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
  }

  function traverse(value) {
    if (isDate(value)) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    } else if (Array.isArray(value)) {
      return value.map(traverse);
    } else if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          value[key] = traverse(value[key]);
        }
      }
      return value;
    }
    return value;
  }
  return traverse(obj);
}