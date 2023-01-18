/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    keyword: this.props.label,
  }

  inputChangedHandler = (event) => {
    this.setState(() => ({
      keyword: event.target.value,
    }))
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemEdit(this.state.keyword)
  }

  render() {
    const { label, onDeleted, timeToNow, onToggleDone, onIconEdit, done, editing } = this.props
    const { keyword } = this.state

    let classNames = ''

    if (done) {
      classNames = 'completed'
    }

    const view = (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description" onClick={onToggleDone} onKeyDown={onToggleDone}>
            {label}
          </span>
          <span className="created">{timeToNow}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onIconEdit} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    )

    if (editing) {
      return (
        <li className="editing">
          {view}
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={keyword} onChange={(event) => this.inputChangedHandler(event)} />
          </form>
        </li>
      )
    }
    return <li className={classNames}>{view}</li>
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onIconEdit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  timeToNow: PropTypes.string.isRequired,
}
