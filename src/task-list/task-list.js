import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';


export default class TaskList extends React.Component {

    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.object),
        onToggleDone: PropTypes.func,
        onIconEdit: PropTypes.func,
        onItemEdit: PropTypes.func,
    }

    render() {
        const {todos, onDeleted, onToggleDone, onIconEdit, onItemEdit} = this.props;
        const elements = todos.map((item) => {
            const {id, ...itemProps} = item;
            return(
                <Task {...itemProps} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} onItemEdit={(keyword) => onItemEdit(id, keyword)} onIconEdit={() => onIconEdit(id)}/>
            )
            
        })
    
        return (
            <ul className="todo-list">
              {elements}
            </ul>
        )
    }
    
}