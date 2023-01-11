import React from 'react';
import TasksFilter from '../tasks-filter';
import PropTypes from 'prop-types';

function Footer({todo, onClearCompleted, onTasksFilter}) {
  return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TasksFilter onTasksFilter={onTasksFilter}/>
        <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
      </footer>
  )
}

Footer.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object),
  onClearCompleted: PropTypes.func,
  onTasksFilter: PropTypes.func
}

export default Footer;