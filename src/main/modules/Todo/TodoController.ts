import { Controller, GET, POST } from 'fastify-decorators'

import TodoFacade from './TodoFacade'

import { CreateTodoAPI, TodoAPI } from './models/APIModels'
import { FastifyRequest } from 'fastify'

@Controller({ route: '/todo' })
export default class TodoController {
  constructor(private _facade: TodoFacade) {}

  @GET({ url: '' })
  async all(): Promise<TodoAPI[]> {
    return this._facade.getAll()
  }

  @GET({ url: '/:id' })
  async get(req: FastifyRequest): Promise<TodoAPI> {
    const params = req.params as { [key: string]: string }
    return this._facade.get(params.id)
  }

  @POST({ url: '' })
  async create(req: FastifyRequest): Promise<TodoAPI> {
    const creationData = req.body as CreateTodoAPI
    return this._facade.create(creationData)
  }
}
