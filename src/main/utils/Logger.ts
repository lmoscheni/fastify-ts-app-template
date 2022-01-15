import { createLogger, format, transports } from 'winston';
import { hostname } from 'os';
import { TransformableInfo } from 'logform';

import { getRequestContext } from '@utils/RequestContext';

const logFormat = format.printf((info: TransformableInfo) => {
  const context = getRequestContext();
  const { req, id } = context;

  const format =
    ':timestamp :level [:hostname] [:requestId] [:client] :message';

  const now = new Date();

  return format
    .replace(
      ':timestamp',
      now.toISOString().replace(/([^T]+)T([^.]+).*/g, '$1 $2')
    )
    .replace(':level', info.level.toUpperCase().padEnd(5, ' '))
    .replace(':hostname', hostname())
    .replace(':client', (req?.headers['x-client'] as string) || 'x-client')
    .replace(':requestId', id || 'requestId')
    .replace(':message', info.message);
});

export const defaultLogger = createLogger({
  level: 'info',
  format: format.combine(logFormat),
  transports: [new transports.Console()]
});
