import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        selected: PropTypes.bool
    }

    onClick = (id, type) => {
        this.props.onTasksFilter(type);
        this.props.onToggleSelected(id);

    }

    render() {
        const {id, type, selected} = this.props
        let classNames = '';
        const label = type[0].toUpperCase() + type.slice(1);

        if(selected) {
            classNames = 'selected'
        }

        return (
            <button className={classNames} onClick = {() => this.onClick(id, type)}>{label}</button>
        )
    }
}