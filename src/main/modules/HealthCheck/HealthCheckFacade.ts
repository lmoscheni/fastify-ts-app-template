// import 'reflect-metadata';
import HealthCheckResponse from './model/HealthCheckResponse';

import pkg from '../../../../package.json';
import { Service } from 'fastify-decorators';

@Service()
export default class HealthCheckFacade {
  healthCheck(): HealthCheckResponse {
    return {
      status: 'UP',
      version: pkg.version,
      appName: pkg.name,
      description: pkg.description,
      author: pkg.author
    };
  }
}
