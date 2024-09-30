// log.decorator.ts
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const LOG_METADATA = 'log-metadata';

export interface LogMetadata {
  title: string;
  businessType: string;
}

export function Log(metadata: LogMetadata) {
  return applyDecorators(
    SetMetadata(LOG_METADATA, metadata),
  );
}
