import { createLogger, format, transports } from 'winston';
import { hostname } from 'os';
import { TransformableInfo } from 'logform';
import { getRequestContext } from '../../context/RequestContext';

const DespFormat = format.printf((info: TransformableInfo) => {
  const context = getRequestContext();
  const { req, id } = context;

  const format =
    ':timestamp :level [:hostname] [:xClient] [:uow] [:requestId] [:trackerId]: :message :data';

  const now = new Date();

  return format
    .replace(
      ':timestamp',
      now.toISOString().replace(/([^T]+)T([^.]+).*/g, '$1 $2')
    )
    .replace(':level', info.level.toUpperCase().padEnd(5, ' '))
    .replace(':hostname', hostname())
    .replace(':xClient', (req?.headers['x-client'] as string) || '')
    .replace(':uow', (req?.headers['x-uow'] as string) || '')
    .replace(':requestId', id || '')
    .replace(':trackerId', '')
    .replace(':message', info.message)
    .replace(':data', '');
});

export const defaultLogger = createLogger({
  level: 'info',
  format: format.combine(DespFormat),
  transports: [new transports.Console()]
});
