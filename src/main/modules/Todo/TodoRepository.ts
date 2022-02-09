import { Service } from 'fastify-decorators'
import { ObjectId } from 'mongodb'

import { Configuration } from '@config/index'
import MongoDbConnection from '@utils/MongoDbConnection'

import { CreateTodo, Todo } from './models/RepositoryModels'

@Service()
export default class TodoRepository {
  collection = MongoDbConnection.collection(
    Configuration.getInstance().dbName,
    'todo'
  )

  async getAll(offset: number, limit: number): Promise<Todo[]> {
    const todos = (await this.collection
      .find({}, { limit: limit, skip: offset })
      .toArray()) as Todo[]
    return todos
  }

  async get(id: string): Promise<Todo | null> {
    const todo = (await this.collection.findOne({
      _id: new ObjectId(id)
    })) as Todo

    return todo
  }

  async create(data: CreateTodo): Promise<Todo | null> {
    const created = await this.collection.insertOne(data)
    return this.get(created.insertedId.toString())
  }
}
