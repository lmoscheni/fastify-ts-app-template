import { ObjectId } from 'mongodb'

export type Todo = {
  _id: ObjectId

  createdBy: string
  createdAt: string
  updatedAt: string

  title: string
  content: string
  imageURL?: string
}

export type CreateTodo = {
  createdBy: string
  createdAt: string

  title: string
  content: string
  imageURL?: string
}

export type UpdateTodo = {
  updatedAt: string

  title?: string
  content?: string
  imageURL?: string
}
