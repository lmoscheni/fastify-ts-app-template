import { Service } from 'fastify-decorators'
import { ObjectId } from 'mongodb'

import { Configuration } from '@config/index'
import MongoDbConnection from '@utils/MongoDbConnection'

import { CreateTodo, Todo, UpdateTodo } from './models/RepositoryModels'

@Service()
export default class TodoRepository {
  collection = MongoDbConnection.collection(
    Configuration.getInstance().dbName,
    'todo'
  )

  async getAll(limit: number, offset: number): Promise<Todo[]> {
    const todos = (await this.collection
      .find({}, { limit: limit, skip: offset })
      .toArray()) as Todo[]
    return todos
  }

  async get(id: string): Promise<Todo> {
    const todo = (await this.collection.findOne({
      _id: new ObjectId(id)
    })) as Todo

    if (!todo) {
      throw new Error('Not found')
    }

    return todo
  }

  async create(data: CreateTodo): Promise<Todo> {
    const created = await this.collection.insertOne(data)
    return this.get(created.insertedId.toString())
  }

  async update(id: string, data: UpdateTodo): Promise<Todo> {
    const updated = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    )

    if (updated.modifiedCount !== 1) {
      throw new Error(`Can not modify Todo[${id}]`)
    }

    return this.get(id)
  }

  async remove(id: string): Promise<{ id: string }> {
    const deleted = await this.collection.deleteOne({ _id: new ObjectId(id) })

    if (deleted.deletedCount !== 1) {
      throw new Error(`Can not delete Todo[${id}]`)
    }

    return { id }
  }
}
