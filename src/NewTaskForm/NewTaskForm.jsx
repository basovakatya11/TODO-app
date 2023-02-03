import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    }

    this.onInputChange = (event) => {
      const {
        target: { name, value },
      } = event

      this.setState({
        [name]: value,
      })
    }

    this.onSubmit = (event) => {
      event.preventDefault()
      const { onItemAdded } = this.props
      const { label, minutes, seconds } = this.state
      if (this.validateForm(label, minutes, seconds)) {
        const time = this.formatTime()
        onItemAdded(label, Date.now(), time)
        this.setState({
          label: '',
          seconds: '',
          minutes: '',
        })
      }
    }
  }

  formatTime = () => {
    const { minutes, seconds } = this.state
    return Number(minutes) * 60 + Number(seconds)
  }

  validateForm = (label, minutes, seconds) => {
    let result = true
    if (label.search(/\S/) === -1) result = false
    if (minutes.search(/\S/) === -1 && seconds.search(/\S/) === -1) result = false
    if (typeof +minutes !== 'number' || typeof +seconds !== 'number') result = false
    if (Number.isNaN(+minutes) || Number.isNaN(+seconds)) result = false
    return result
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            onChange={this.onInputChange}
            value={label}
            autoFocus
            name="label"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            name="minutes"
            onChange={this.onInputChange}
            value={minutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            name="seconds"
            onChange={this.onInputChange}
            value={seconds}
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
