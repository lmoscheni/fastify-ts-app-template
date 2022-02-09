import { FastifyRequest } from 'fastify'
import { Logger } from 'winston'
import rTracer from 'cls-rtracer'

import { defaultLogger } from '@utils/Logger'

export interface RequestContext {
  id: string
  req?: FastifyRequest
  isRequest: boolean
  startTimestamp: number
  logger: Logger
}

class RequestContextImpl implements RequestContext {
  id: string
  req?: FastifyRequest
  isRequest: boolean
  startTimestamp: number
  logger: Logger

  constructor(id: string, logger: Logger, req?: FastifyRequest) {
    this.id = id
    this.req = req
    this.isRequest = req != undefined
    this.startTimestamp = new Date().getTime()
    this.logger = logger
  }
}

const DEFAULT_CONTEXT = new RequestContextImpl('', defaultLogger)
const _contexts: Map<string, RequestContext> = new Map()

const shortRequestId = (id: string): string => (id || 'unknown').split('-')[0]

export function setupRequestContext(reqId: string, req?: FastifyRequest): void {
  const shortReqId = shortRequestId(reqId)
  _contexts.set(
    shortReqId,
    new RequestContextImpl(shortReqId, defaultLogger, req)
  )
}

export function getRequestContext(): RequestContext {
  const shortReqId = shortRequestId(rTracer.id() as string)
  return _contexts.get(shortReqId) || DEFAULT_CONTEXT
}

export function deleteRequestContext(reqId: string): void {
  _contexts.delete(reqId.split('-')[0])
}
