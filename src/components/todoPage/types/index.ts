export type TodoItemType = {
id: number
  attributes: TodoAttribute
}

export type TodoAttribute = {
  title: string
  isCompleted: boolean
}

export type TodoInputModal = {
  todoItem: TodoItemType
  onClose: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id:number) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, todoItem: TodoItemType) => void
}