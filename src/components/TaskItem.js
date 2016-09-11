import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class TaskItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {task, completeTask, deleteTask} = this.props

        let element = (
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={task.completed}
                           onChange={() => completeTask(task.id)}/>
                    <label>
                        {task.text}
                    </label>
                    <button className="destroy"
                            onClick={() => deleteTask(task.id)}/>
                </div>
            )

        return (
            <li className={classnames({
                completed: task.completed
            })}>
                {element}
            </li>
        )
    }
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired
}

export default TaskItem
