/**
 * 时间区间对象
 */
import { IsDateString } from "class-validator";

export class DateParamsDTO {
  @IsDateString()
  beginTime: string;

  @IsDateString()
  endTime: string;
}
