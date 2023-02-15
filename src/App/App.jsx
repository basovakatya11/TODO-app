import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

function App() {
  let maxId = 11

  const createTodoItem = (label, addingTime, timer, editing = false) => {
    return {
      label,
      addingTime,
      timeToNow: formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true }),
      id: maxId++,
      done: false,
      editing,
      timer,
    }
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Task 1', '2023-01-11 10:35', 60),
    createTodoItem('Task 2', '2023-01-11 10:30', 60),
    createTodoItem('Task 3', '2023-01-11 10:40', 40),
  ])

  const [filter, setFilter] = useState('all')

  const tick = () => {
    setTodoData((data) => {
      const newArray = data.map((elem) => {
        const { addingTime } = elem
        const newEl = { ...elem }
        newEl.timeToNow = formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true })
        return newEl
      })
      return newArray
    })
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  }, [])

  const filterTasks = (filterValue) => {
    setFilter(filterValue)
  }

  const editItem = (id, label) => {
    setTodoData((data) => {
      const idx = data.findIndex((elem) => elem.id === id)
      const oldObj = data[idx]
      const newObj = oldObj.editing ? { ...oldObj, editing: false, label } : { ...oldObj, editing: true }

      const newArray = [...data.slice(0, idx), newObj, ...data.slice(idx + 1)]

      return newArray
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((elem) => elem.id === id)
    const oldObj = arr[idx]
    const newObj = { ...oldObj, [propName]: !oldObj[propName] }
    return [...arr.slice(0, idx), newObj, ...arr.slice(idx + 1)]
  }

  const onToggleDone = (id) => {
    setTodoData((data) => toggleProperty(data, id, 'done'))
  }

  const addItem = (text, addingTime, timer) => {
    const newItem = createTodoItem(text, addingTime, timer)

    setTodoData((data) => [...data, newItem])
  }

  const deleteCompletedItems = () => {
    setTodoData((data) => {
      const newArray = data.filter((el) => !el.done)
      return newArray
    })
  }

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((elem) => elem.id === id)
      const newArray = [...data.slice(0, idx), ...data.slice(idx + 1)]
      return newArray
    })
  }

  const filterFunction = (items, filterValue) => {
    const match = {
      all() {
        return items
      },
      active() {
        return items.filter((item) => !item.done)
      },
      completed() {
        return items.filter((item) => item.done)
      },
    }

    return match[filterValue] ? match[filterValue]() : items
  }

  const filteredTodoData = filterFunction(todoData, filter)

  const todoCount = todoData.length - todoData.filter((item) => item.done).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={filteredTodoData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onItemEdit={editItem}
          onIconEdit={editItem}
        />
        <Footer todo={todoCount} onClearCompleted={deleteCompletedItems} onTasksFilter={filterTasks} />
      </section>
    </section>
  )
}

export default App
