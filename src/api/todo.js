import axios from "axios"

const URL = "http://localhost:1337/api/todos"

export const getTodoItem = async () => {
  try {
    const { data } = await axios.get(URL)
    return data
  } catch (error) {
    console.log("error", error)
  }
}

export const addTodoItem = async (title) => {
  try {
    const { data } = await axios.post(URL, {
      data: {
        title,
      },
    })
    return data
  } catch (err) {
    console.log("error", err)
  }
}

export const deleteTodoItem = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data
  } catch (error) {
    console.error("[delete todoItem Failed]")
  }
}

export const changeTodoItem = async (todo, id) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, {
      data: {
        todo,
      },
    })
    return data
  } catch (error) {
    console.error("[change todoItem Failed]")
  }
}

export const isCompletedTodo = async (id, isCompleted) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, {
      data: {
        isCompleted,
      },
    })
    return data
  } catch (error) {
    console.error("[change isCompleted Failed]")
  }
}
