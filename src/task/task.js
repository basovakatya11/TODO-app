import React from 'react';
import PropTypes from 'prop-types';


export default class Task extends React.Component {

    static propTypes = {
        label: PropTypes.string,
        onDeleted: PropTypes.func,
        onToggleDone: PropTypes.func,
        onIconEdit: PropTypes.func,
        done: PropTypes.bool,
        editing: PropTypes.bool,
        timeToNow: PropTypes.string,
    }

    state = {
        keyword: this.props.label,
    }
    
    inputChangedHandler = (event) => {
        this.setState(() => {
            return {
                keyword: event.target.value,
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemEdit(this.state.keyword);
    }

    render () {
        const {label, onDeleted, timeToNow, onToggleDone, onIconEdit, done, editing} = this.props;
        const {keyword} = this.state;

        let classNames ='';

        if(done) {
            classNames = 'completed'
        }

        const view = (
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description" onClick={onToggleDone} >{label}</span>
                    <span className="created">{timeToNow}</span>
                </label>
                <button className="icon icon-edit" onClick ={onIconEdit}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        )

        if (editing) {
            return (
                <li className="editing">
                    {view}
                    <form onSubmit={this.onSubmit}>
                        <input type="text" className="edit" value={keyword} onChange={(event)=>this.inputChangedHandler(event)}/>
                    </form>
                </li>
            )
        }
        return (
            <li className = {classNames}>
                {view}
            </li>
        )

    }
}

