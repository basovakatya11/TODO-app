import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

function Footer({ todo, onClearCompleted, onTasksFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todo} items left</span>
      <TasksFilter onTasksFilter={onTasksFilter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onTasksFilter: PropTypes.func.isRequired,
}

export default Footer
