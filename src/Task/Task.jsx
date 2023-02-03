import React from 'react'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    keyword: this.props.label,
    play: true,
    timer: this.props.timer,
  }

  componentDidMount() {
    this.timeInterval = setInterval(this.updateTimer, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { play } = this.state
    if (play !== prevState.play) {
      if (play) {
        this.timeInterval = setInterval(this.updateTimer, 1000)
      } else {
        clearInterval(this.timeInterval)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  inputChangedHandler = (event) => {
    this.setState(() => ({
      keyword: event.target.value,
    }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const label = this.state.keyword
    if (label.search(/\S/) !== -1) this.props.onItemEdit(this.state.keyword)
  }

  updateTimer = () => {
    const { timer } = this.state
    if (timer < 1) {
      this.setState({
        play: false,
      })
      return
    }
    this.setState(() => {
      const newTime = timer - 1
      return {
        timer: newTime,
      }
    })
  }

  pauseTimer = () => {
    const { play } = this.state
    if (play) {
      this.setState({
        play: false,
      })
    }
  }

  playTimer = () => {
    const { play } = this.state
    if (!play) {
      this.setState({
        play: true,
      })
    }
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  render() {
    const { label, onDeleted, timeToNow, onToggleDone, onIconEdit, done, editing } = this.props
    const { keyword, timer } = this.state

    let classNames = ''

    if (done) {
      classNames = 'completed'
    }

    const view = (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="title" onClick={onToggleDone} onKeyDown={onToggleDone}>
            {label}
          </span>
          <span className="description">
            <button type="button" aria-label="play" className="icon icon-play" onClick={this.playTimer} />
            <button type="button" aria-label="pause" className="icon icon-pause" onClick={this.pauseTimer} />
            {this.formatTime(timer)}
          </span>
          <span className="description">{timeToNow}</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="Edit" onClick={onIconEdit} />
        <button type="button" className="icon icon-destroy" aria-label="Destroy" onClick={onDeleted} />
      </div>
    )

    if (editing) {
      return (
        <li className="editing">
          {view}
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={keyword}
              onChange={(event) => this.inputChangedHandler(event)}
              autoFocus
            />
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
  timer: PropTypes.number.isRequired,
}
