type KeyValue = { [key: string]: any }

export class NotFound extends Error {
  code = 404

  message: string
  stack?: string | undefined

  constructor(todoId: string, stack?: string | undefined) {
    super()
    this.message = `Can not find todo with the id = ${todoId}`
    this.stack = stack
  }
}

export class CreationError extends Error {
  code = 500
  message = 'Can not create a new Todo'

  data: KeyValue
  stack?: string | undefined

  constructor(data: KeyValue, stack?: string | undefined) {
    super()
    this.stack = stack
    this.data = data
  }
}
