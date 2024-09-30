import { ValueTransformer } from 'typeorm';
import { ConvertDate } from "../model/ConvertDate";
export class DateTransformer implements ValueTransformer {
  to(value: Date): ConvertDate {
    return value;
  }

  from(value: Date): ConvertDate {
    return ConvertDate.convert(value);
  }

}
