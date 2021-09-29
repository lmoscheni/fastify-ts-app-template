import fastify from 'fastify';
import fastifyEnv from 'fastify-env';
import fastifyHelmet from 'fastify-helmet';
import fastifySwagger from 'fastify-swagger';

import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';

import pkg from '../../package.json';

export default class App {
  private readonly server = fastify();

  private registerControllers(): void {
    this.server.register(bootstrap, {
      directory: resolve(__dirname, `modules`), // Specify directory with our controllers
      mask: /Controller\./ // Specify mask to match only our controllers
    });
  }

  private registerEnvConfig(): void {
    this.server.register(fastifyEnv, {
      dotenv: true,
      schema: {
        type: 'object',
        required: ['PORT'],
        properties: {
          PORT: {
            type: 'string',
            default: 8080
          }
        }
      }
    });
  }

  private registerHelment(): void {
    this.server.register(fastifyHelmet, {});
  }

  private registerSwagger(): void {
    this.server.register(fastifySwagger, {
      openapi: {
        info: {
          title: pkg.name,
          description: pkg.description,
          version: pkg.version
        }
      }
    });
  }

  start(): void {
    this.registerEnvConfig();
    this.registerHelment();
    this.registerControllers();
    this.registerSwagger();

    this.server.listen(8080, (err: Error, address: string) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }
}
