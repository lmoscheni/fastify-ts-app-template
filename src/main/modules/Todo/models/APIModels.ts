export type TodoAPI = {
  id: string

  createdBy: string
  createdAt: string
  updatedAt: string

  title: string
  content: string
  imageURL?: string
}

export type CreateTodoAPI = {
  createdBy: string

  title: string
  content: string
  imageURL?: string
}
