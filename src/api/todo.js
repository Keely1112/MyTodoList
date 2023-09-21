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

export const addTodoItem = async (todo) => {
  try {
    console.log("todo", todo)
    const { data } = await axios.post(URL, {
      data: {
        todo,
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
    const res = await axios.put(`${URL}/${id}`, {
      data: {
        todo,
      },
    })
    return res.data
  } catch (error) {
    console.error("[change todoItem Failed]")
  }
}
