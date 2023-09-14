import axios from "axios";

const URL = 'http://127.0.0.1:8090/api/collections/todolist/records'

export const getTodoItem = async () => {
  try {
    const { data } = await axios.get(URL)
    return data.items
  } catch (error) {
    console.log('error', error);
  }
}

export const addTodoItem = async (todo) => {
  try {
    const { data } = await axios.post(URL, {todo})
    return data
  } catch (err) {
    console.log('error', err);
  }
}

export const deleteTodoItem = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`)
    return data
  } catch (error) {
    console.error('[delete todoItem Failed]');
  }
}

export const changeTodoItem = async (todo, id) => {
  try {
    const { data } = await axios.patch(`${URL}/${id}`,{todo})
    return data
  } catch (error) {
    console.error('[change todoItem Failed]')
  }
}