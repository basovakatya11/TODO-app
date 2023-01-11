import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
    static propTypes = {
        onItemAdded: PropTypes.func,
    }

    state = {
        label: '',
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label, Date.now());
        this.setState({
            label: '',
        })
    }

    render () {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit = {this.onSubmit}>
                    <input className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    onChange = {this.onLabelChange}
                    value = {this.state.label}
                    /> 
                </form>
            </header>
        )
    }
    
}