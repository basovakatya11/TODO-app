import React from 'react';
import Button from '../filter-button';
import PropTypes from 'prop-types';


export default class TasksFilter extends React.Component {
  static propTypes = {
    onTasksFilter: PropTypes.func
  }

  state = {
    buttons: [
      {type: 'all', selected: true, id: 1},
      {type: 'active', selected: false, id: 2},
      {type: 'completed', selected: false, id: 3}
    ]
  }

  onToggleSelected = (id) => {
    this.setState(({buttons}) => {
      const newArray = buttons.map((item) => {
        item.selected = false;
        return item;
      })
      const idx = buttons.findIndex((el) => el.id === id);
      newArray[idx].selected = true;
      return {
        buttons: newArray
      }
      
    })
  }

  render() {
    const {onTasksFilter} = this.props;
    const {buttons} = this.state;

    const elements = buttons.map((button) => {
      const {id, ...itemProps} = button;
      return(
        <li key={id}><Button {...itemProps} id ={id} onTasksFilter={onTasksFilter} onToggleSelected = {this.onToggleSelected}/></li>
      )
      
    })

    return (
      <ul className="filters">
        {elements}
      </ul>
    ) 
  }
    
  
}