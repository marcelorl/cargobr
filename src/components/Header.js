import React, {PropTypes, Component} from 'react'
import TaskTextInput from './TaskTextInput'

class Header extends Component {
    constructor(props, context) {
        super(props, context)

        this.handleSave = this.handleSave.bind(this)
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.actions.addTask(text)
        }
    }

    render() {
        return (
            <header className="header">
                <h1>ITask</h1>
                <TaskTextInput newTask
                               onSave={this.handleSave}
                               placeholder="O que você tem que fazer?"/>
            </header>
        )
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired
}

export default Header
