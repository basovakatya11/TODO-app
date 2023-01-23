import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default class App extends React.Component {
  maxId = 11

  state = {
    todoData: [
      this.createTodoItem('Completed Task', '2023-01-11 10:35'),
      this.createTodoItem('Editing Task', '2023-01-11 10:30', true),
      this.createTodoItem('Active Task', '2023-01-11 10:40'),
    ],
    filter: 'all',
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  filterTasks = (filter) => {
    this.setState({
      filter,
    })
  }

  editItem = (id, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id)
      const oldObj = todoData[idx]
      const newObj = oldObj.editing ? { ...oldObj, editing: false, label } : { ...oldObj, editing: true }

      const newArray = [...todoData.slice(0, idx), newObj, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }))
  }

  addItem = (text, addingTime) => {
    const newItem = this.createTodoItem(text, addingTime)

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.done)
      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((elem) => elem.id === id)
    const oldObj = arr[idx]
    const newObj = { ...oldObj, [propName]: !oldObj[propName] }
    return [...arr.slice(0, idx), newObj, ...arr.slice(idx + 1)]
  }

  filter(items, filter) {
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

    return match[filter] ? match[filter]() : items
  }

  createTodoItem(label, addingTime, editing = false) {
    return {
      label,
      addingTime,
      timeToNow: formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true }),
      id: this.maxId++,
      done: false,
      editing,
    }
  }

  tick() {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((elem) => {
        const { addingTime } = elem
        const newEl = { ...elem }
        newEl.timeToNow = formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true })
        return newEl
      })
      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const filteredTodoData = this.filter(todoData, filter)

    const todoCount = todoData.length - todoData.filter((item) => item.done).length

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={filteredTodoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onItemEdit={this.editItem}
            onIconEdit={this.editItem}
          />
          <Footer todo={todoCount} onClearCompleted={this.deleteCompletedItems} onTasksFilter={this.filterTasks} />
        </section>
      </section>
    )
  }
}
