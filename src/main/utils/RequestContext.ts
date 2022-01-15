import { FastifyRequest } from 'fastify';
import { Logger } from 'winston';
import rTracer from 'cls-rtracer';

import { defaultLogger } from '@utils/Logger';

export interface RequestContext {
  id: string;
  req?: FastifyRequest;
  isRequest: boolean;
  startTimestamp: number;
  logger: Logger;
}

class RequestContextImpl implements RequestContext {
  id: string;
  req?: FastifyRequest;
  isRequest: boolean;
  startTimestamp: number;
  logger: Logger;

  constructor(id: string, logger: Logger, req?: FastifyRequest) {
    this.id = id;
    this.req = req;
    this.isRequest = req != undefined;
    this.startTimestamp = new Date().getTime();
    this.logger = logger;
  }
}

const _contexts: { [key: string]: RequestContext } = {};

const DEFAULT_CONTEXT = new RequestContextImpl('', defaultLogger);

export function setupRequestContext(reqId: string, req?: FastifyRequest): void {
  const shortReqId = (reqId || 'unknown').split('-')[0];

  _contexts[shortReqId] = new RequestContextImpl(
    shortReqId,
    defaultLogger,
    req
  );
}

export function getRequestContext(): RequestContext {
  const shortReqId = ((rTracer.id() as string) || '').split('-')[0];
  return _contexts[shortReqId] || DEFAULT_CONTEXT;
}

export function deleteRequestContext(reqId: string): void {
  delete _contexts[reqId.split('-')[0]];
}
