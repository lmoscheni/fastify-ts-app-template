import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import rTracer from 'cls-rtracer';

import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';

import config from '@config/index';
import { defaultLogger } from '@utils/Logger';
import {
  deleteRequestContext,
  setupRequestContext
} from '@utils/RequestContext';

export default class App {
  private readonly server = fastify();

  private registerControllers(): void {
    this.server.register(bootstrap, {
      directory: resolve(__dirname, `modules`), // Specify directory with our controllers
      mask: /Controller\./ // Specify mask to match only our controllers
    });
  }

  private registerHelment(): void {
    this.server.register(fastifyHelmet, {});
  }

  private registerRTracer(): void {
    this.server.register(rTracer.fastifyPlugin);
  }

  private setupContextHooks() {
    this.server.addHook('preHandler', async (req) => {
      setupRequestContext(rTracer.id() as string, req);

      const bodyToLog = req.body ? JSON.stringify(req.body) : '';
      defaultLogger.info(`request ${req.method} ${req.url} ${bodyToLog}`);
    });

    this.server.addHook('onSend', async (_req, repl, payload) => {
      const payloadToLog =
        JSON.stringify(payload).length > 1024
          ? 'payload-is-too-long-to-log'
          : payload;
      defaultLogger.info(`response [${repl.statusCode}] ${payloadToLog}`);

      deleteRequestContext(rTracer.id() as string);
    });
  }

  start(): void {
    this.registerHelment();
    this.registerControllers();
    this.registerRTracer();

    this.setupContextHooks();

    this.server.listen(
      config().port,
      '::',
      (err: Error | null, address: string) => {
        if (err) {
          defaultLogger.error(`Error on start ${err.toString()}`);
          process.exit(1);
        }
        defaultLogger.info(`Server listening at ${address}`);
      }
    );
  }
}
