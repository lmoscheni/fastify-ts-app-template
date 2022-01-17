import { Service } from 'fastify-decorators';

import { getRequestContext } from '@utils/RequestContext';

import HealthCheckResponse from './model/HealthCheckResponse';

import pkg from '@root/package.json';

@Service()
export default class HealthCheckFacade {
  healthCheck(): HealthCheckResponse {
    const context = getRequestContext();
    context.logger.info(`${this?.constructor?.name}:healthCheck`);
    return {
      status: 'UP',
      version: pkg.version,
      appName: pkg.name,
      description: pkg.description,
      author: pkg.author
    };
  }
}
