export type TodoItemType = {
id: number
  attributes: TodoAttribute
}

export type TodoAttribute = {
  title: string
  isCompleted: boolean
}