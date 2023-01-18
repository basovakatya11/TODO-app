import React from 'react'
import PropTypes from 'prop-types'

import Button from '../filter-button'

export default class TasksFilter extends React.Component {
  state = {
    buttons: [
      { type: 'all', selected: true, id: 1 },
      { type: 'active', selected: false, id: 2 },
      { type: 'completed', selected: false, id: 3 },
    ],
  }

  onToggleSelected = (id) => {
    this.setState(({ buttons }) => {
      const newArray = buttons.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.selected = false
        return item
      })
      const idx = buttons.findIndex((el) => el.id === id)
      newArray[idx].selected = true
      return {
        buttons: newArray,
      }
    })
  }

  render() {
    const { onTasksFilter } = this.props
    const { buttons } = this.state

    const elements = buttons.map((button) => {
      const { id, ...itemProps } = button
      return (
        <li key={id}>
          <Button {...itemProps} id={id} onTasksFilter={onTasksFilter} onToggleSelected={this.onToggleSelected} />
        </li>
      )
    })

    return <ul className="filters">{elements}</ul>
  }
}

TasksFilter.propTypes = {
  onTasksFilter: PropTypes.func.isRequired,
}
