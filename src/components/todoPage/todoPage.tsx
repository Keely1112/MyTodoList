import React from "react"
import { useEffect, useState } from "react"
import {
  changeTodoItem,
  getTodoItem,
  deleteTodoItem,
  addTodoItem,
  changeCompletedTodoItem,
} from "@/api/todo.ts"
import Button from "../Button/Button.js"
import style from "../button/button.module.scss"
import styles from "./todoPage.module.scss"
import toast, { Toaster } from "react-hot-toast"
import { TodoItemType } from "./types/index.js"

function TodoPage() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [task, setTask] = useState("")

  const handleAddKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!task || e.key !== "Enter") {
      return
    }
    addTodo()
  }

  const handleAddClick = () => {
    if (!task) {
      return
    }
    addTodo()
  }

  const addTodo = async () => {
    try {
      const newTodo = await addTodoItem(task)
      setTodoItems((prev) => [...prev, newTodo.data])
      toast.success("Success! Added new todo item.", {
        duration: 1000,
        icon: "🎉",
      })
      setTask("")
    } catch (err) {
      console.error("Error adding todo:", err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoItem(id)
      const updatedTodoItem = todoItems.filter((todo) => todo.id !== id)
      setTodoItems(updatedTodoItem)
      toast.success("Success! Deleted todo item.", {
        duration: 1000,
        icon: "👏",
      })
    } catch (err) {
      console.error("Error deleting todo:", err)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
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
  }

  const handleChangeKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoItem: TodoItemType
  ) => {
    try {
      if (!todoItem.attributes.title || e.key !== "Enter") {
        return
      }
      await changeTodoItem(todoItem.attributes.title, todoItem.id)
      toast.success("Success! Change selected todo item.", {
        duration: 1000,
        icon: "👌",
      })
    } catch (error) {
      console.error("Error changeTodoItem:", error)
    }
  }

  const handleCompleted = async (id: number, isCompleted: boolean) => {
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
      await changeCompletedTodoItem(id, !isCompleted)
      toast.success("Success! Completed todo item.", {
        duration: 1000,
        icon: "💯",
      })
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
          onKeyDown={handleAddKeyDown}
        />
        <Button onClick={handleAddClick} className={style.addButton}>
          ✓
        </Button>
        <Toaster />
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
                  onKeyDown={(e) => handleChangeKeyDown(e, todoItem)}
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
