import { Controller, GET } from 'fastify-decorators';

import { getRequestContext } from '@utils/RequestContext';

import HealthCheckFacade from './HealthCheckFacade';

import HealthCheckResponse from './model/HealthCheckResponse';

@Controller({ route: '/' })
export default class HealthCheckController {
  constructor(private _facade: HealthCheckFacade) {}

  @GET({ url: '/health-check' })
  async healthCheckHandler(): Promise<HealthCheckResponse> {
    const context = getRequestContext();
    context.logger.info(`${this?.constructor?.name}:healthCheckHandler`);
    return this._facade.healthCheck();
  }
}
