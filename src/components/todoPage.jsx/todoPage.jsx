import { useEffect, useState } from "react"
import {
  changeTodoItem,
  getTodoItem,
  deleteTodoItem,
  addTodoItem,
  isCompletedTodo,
} from "../../api/todo"
import Button from "../button/button"
import style from "../button/button.module.scss"
import styles from "./todoPage.module.scss"

function TodoPage() {
  const [todoItems, setTodoItems] = useState([])
  const [task, setTask] = useState("")

  const handleAddTodo = async (e) => {
    try {
      if (!task) {
        return
      } else if (e.key === "Enter" || e.type === "click") {
        const newTodo = await addTodoItem(task)
        setTodoItems((prev) => [...prev, newTodo.data])
        console.log([newTodo], newTodo)
        setTask("")
      }
    } catch (err) {
      console.error("Error adding todo:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodoItem(id)
      const updatedTodoItem = todoItems.filter((todo) => todo.id !== id)
      setTodoItems(updatedTodoItem)
    } catch (err) {
      console.error("Error deleting todo:", err)
    }
  }

  const handleInputChange = async (e, id) => {
    try {
      const updateValue = e.target.value
      const updatedTodoItem = todoItems.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            attributes: { ...todo.attributes, title: updateValue },
          }
        }
        return todo
      })
      setTodoItems(updatedTodoItem)
      await changeTodoItem(updateValue, id)
    } catch (err) {
      console.error("Error changing todo:", err)
    }
  }

  const handleCompleted = async (id, isCompleted) => {
    try {
      const completed = todoItems.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            attributes: { ...todo.attributes, isCompleted: !isCompleted },
          }
        }
        return todo
      })
      setTodoItems(completed)
      await isCompletedTodo(id, !isCompleted)
    } catch (error) {
      console.error("Error handleCompleted todo:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoItem = await getTodoItem()
        setTodoItems(todoItem.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <nav className={styles.navContainer}>DailyPlan</nav>
      <div>
        <p className={styles.todoList}>Add Todo List</p>
      </div>
      <div className={styles.newTodoContainer}>
        <input className={styles.checkBox} type="checkbox" />
        <input
          className={styles.newInputText}
          type="text"
          value={task}
          placeholder="new todo..."
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleAddTodo}
        />
        <Button onClick={handleAddTodo} className={style.addButton}>
          ✓
        </Button>
      </div>
      <div>
        <p className={styles.todoList}>Todo List</p>
      </div>
      <div className={styles.taskContainer}>
        {todoItems.length > 0 &&
          todoItems.map((todoItem) => {
            return (
              <div className={styles.todoContainer} key={todoItem.id}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  checked={todoItem.attributes.isCompleted}
                  onChange={() =>
                    handleCompleted(
                      todoItem.id,
                      todoItem.attributes.isCompleted
                    )
                  }
                />
                <input
                  className={styles.inputText}
                  style={{
                    textDecoration: todoItem.attributes.isCompleted
                      ? "line-through"
                      : "none",
                  }}
                  type="text"
                  value={todoItem.attributes.title}
                  onChange={(e) => handleInputChange(e, todoItem.id)}
                />
                <Button
                  onClick={() => handleDelete(todoItem.id)}
                  className={style.delButton}
                >
                  X
                </Button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default TodoPage
