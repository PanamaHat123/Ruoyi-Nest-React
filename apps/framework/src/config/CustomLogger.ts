import { LoggerService } from '@nestjs/common'
import { createLogger, format, Logger, transports } from 'winston'
import { ConvertDate } from "apps/common/src/model/ConvertDate";
import { AsyncStore } from "apps/common/src/utils/AsyncStore";
const DailyRotateFile = require('winston-daily-rotate-file')
const chalk = require('chalk')


export class CustomLogger implements LoggerService {
  private logger: Logger
  constructor() {

    this.logger = createLogger({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
            format: format.combine(
              format.colorize(),
              format.printf((data) => {
                const { level, message } = data;
                const appStr = chalk.green(`[NEST]`)
                const store = AsyncStore.getStore();
                const contextId = store?.get('contextId')||+ new Date()
                const contextStr = chalk.yellow(`[${contextId}]`)
                const time = new ConvertDate(new Date()).toISOString();
                return `${appStr} ${time} ${level} ${contextStr} ${message} `
              })
            )
          }),
        new DailyRotateFile({
            level: 'info',
            dirname: 'log',
            filename: 'nest-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH-mm',
            maxSize: '10M'
          })
      ]
    })
  }

  log(message: string, context: string,params:string) {
    this.logger.log('info', `[${context||''}] [${params||''}]:  ${message||''}`)
  }

  error(message: string, context: string,params:string) {
    this.logger.log('error', `[${context||''}] [${params||''}]:  ${message||''}`)
  }

  warn(message: string, context: string,params:string) {
    this.logger.log('warn', `[${context||''}] [${params||''}]:  ${message||''}`)
  }
}
