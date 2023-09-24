import axios from "axios"

const URL = "http://localhost:1337/api/todos"

export const getTodoItem = async () => {
  try {
    const { data } = await axios.get(URL)
    return data
  } catch (error) {
    throw new Error("Failed to fetch todo items")
  }
}

export const addTodoItem = async (title: string) => {
  try {
    const { data } = await axios.post(URL, {
      data: {
        title,
      },
    })
    return data
  } catch (err) {
    throw new Error("Failed to add todo item")
  }
}

export const deleteTodoItem = async (id: number) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data
  } catch (error) {
    throw new Error("Failed to delete todo item")
  }
}

export const changeTodoItem = async (title: string, id: number) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, {
      data: {
        title,
      },
    })
    return data
  } catch (error) {
    throw new Error("Failed to change todo item")
  }
}

export const changeCompletedTodoItem = async (id: number, isCompleted: boolean) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, {
      data: {
        isCompleted,
      },
    })
    return data
  } catch (error) {
    throw new Error("Failed to change isCompleted status")
  }
}
