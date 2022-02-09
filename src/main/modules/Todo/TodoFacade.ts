import { Service } from 'fastify-decorators'
import { CreationError, NotFound } from './models/APIErrors'
import { CreateTodoAPI, TodoAPI } from './models/APIModels'
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
    const todo = await this._repository.get(id)

    if (!todo) {
      throw new NotFound(id)
    }

    return fromRepositoryToAPI(todo)
  }

  async create(data: CreateTodoAPI): Promise<TodoAPI> {
    const created = await this._repository.create({
      ...data,
      createdAt: new Date().toString()
    })

    if (!created) {
      throw new CreationError(data)
    }
    return fromRepositoryToAPI(created)
  }
}
