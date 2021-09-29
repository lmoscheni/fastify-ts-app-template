import { Controller, GET } from 'fastify-decorators';

import HealthCheckFacade from './HealthCheckFacade';

import HealthCheckResponse from './model/HealthCheckResponse';

@Controller({ route: '/' })
export default class HealthCheckController {
  constructor(private _facade: HealthCheckFacade) {}

  @GET({ url: '/health-check' })
  async healthCheckHandler(): Promise<HealthCheckResponse> {
    return this._facade.healthCheck();
  }
}
