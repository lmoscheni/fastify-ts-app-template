import { Service } from 'fastify-decorators'
import { CreationError, NotFound, UpdateError } from './models/APIErrors'
import { CreateTodoAPI, TodoAPI, UpdateTodoAPI } from './models/APIModels'
import { Todo } from './models/RepositoryModels'
import TodoRepository from './TodoRepository'

const fromRepositoryToAPI = (todo: Todo): TodoAPI => ({
  id: todo._id.toString(),
  createdAt: todo.createdAt,
  createdBy: todo.createdBy,
  updatedAt: todo.updatedAt,
  title: todo.title,
  content: todo.content,
  imageURL: todo.imageURL
})

@Service()
export default class TodoFacade {
  constructor(private _repository: TodoRepository) {}

  async getAll(limit = 50, offset = 0): Promise<TodoAPI[]> {
    const todos = await this._repository.getAll(limit, offset)
    return todos.map(fromRepositoryToAPI)
  }

  async get(id: string): Promise<TodoAPI> {
    try {
      const todo = await this._repository.get(id)
      return fromRepositoryToAPI(todo)
    } catch (err) {
      throw new NotFound(id)
    }
  }

  async create(data: CreateTodoAPI): Promise<TodoAPI> {
    try {
      const created = await this._repository.create({
        ...data,
        createdAt: new Date().toString()
      })
      return fromRepositoryToAPI(created)
    } catch (e) {
      throw new CreationError(data)
    }
  }

  async remove(id: string): Promise<{ id: string }> {
    return this._repository.remove(id)
  }

  async update(id: string, data: UpdateTodoAPI): Promise<TodoAPI> {
    try {
      const updated = await this._repository.update(id, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      return fromRepositoryToAPI(updated)
    } catch (e) {
      throw new UpdateError({ id, ...data })
    }
  }
}
