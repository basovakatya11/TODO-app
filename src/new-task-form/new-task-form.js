import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      e.preventDefault()
      const { onItemAdded } = this.props
      const { label } = this.state
      onItemAdded(label, Date.now())
      this.setState({
        label: '',
      })
    }
  }

  render() {
    const { label } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
