import { useEffect, useState } from 'react'
import { changeTodoItem, getTodoItem, deleteTodoItem, addTodoItem } from '../../api/todo'
import Button from '../button/button'
import styles from './header.module.scss'

function Header() {
  const [todoItems, setTodoItem] = useState([])
  const [task, setTask] = useState('')
  
  const handleAddTodo = async () => {
    try {
      if(!task){
        return;
      }
      const newTodo = await addTodoItem(task)
      setTodoItem((prevTodoItem) => [...prevTodoItem, newTodo]);
      setTask('')
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodoItem(id)
      const updatedTodoItem = todoItems.filter((todo) => todo.id !== id)
      setTodoItem(updatedTodoItem)
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  const handleInputChange = async (e, id) => {
    try {
      const updateValue = e.target.value;
      const updatedTodoItem = todoItems.map((todo) => {
        if (todo.id === id) {
          return {...todo, todo: updateValue}
        }
        return todo  
    })
      setTodoItem(updatedTodoItem)
      await changeTodoItem(updateValue, id)
    } catch (err) {
      console.error('Error changing todo:', err)
    }
  }

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const todoItem = await getTodoItem()
        setTodoItem(todoItem)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  },[])

  return (
    <div> 
      <nav className='navContainer'>DailyPlan</nav>
      <div>
        <p className='todoList'>Add Todo List</p>
      </div>
      <div className='newTodoContainer'>
        <input className='checkBox' type="checkbox" />
        <input 
          className='newInputText' 
          type="text" 
          value={task}
          placeholder='new todo...'
          onChange={(e) => setTask(e.target.value)}
          />
        <Button 
          onClick={handleAddTodo} 
          className={styles.addButton} 
        >✓</Button>
      </div>
      <div>
        <p className='todoList'>Todo List</p>
      </div>
      <div className='taskContainer'>
        {todoItems.length > 0 && todoItems.map((todoItem)=> {
          return ( <div className='todoContainer' key={todoItem.id} >
          <input className='checkBox' type="checkbox" />
          <input className='inputText' type="text" value={todoItem.todo || ''} onChange={(e) => handleInputChange(e, todoItem.id)} />
        <Button 
          onClick={() => handleDelete(todoItem.id)} 
          className={styles.delButton} 
        >X</Button>
        </div> )
    })}
    </div>
    </div>
  )
}

export default Header