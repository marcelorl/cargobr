import React, {Component, PropTypes} from 'react'
import TaskItem from './TaskItem'
import Footer from './Footer'
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TaskFilters'
import classnames from 'classnames'
import {ORDER_MOST_RECENT, ORDER_LEAST_RECENT} from '../constants/TaskOrder'

const TASK_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: task => !task.completed,
    [SHOW_COMPLETED]: task => task.completed
}

const ORDER_TITLES = {
    [ORDER_MOST_RECENT]: 'Mais recentes',
    [ORDER_LEAST_RECENT]: 'Mais antigas'
}

class MainSection extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {filter: SHOW_ALL, order: ORDER_MOST_RECENT}

        this.handleOrder = this.handleOrder.bind(this)
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted()
    }

    handleOrder(order) {
        let {orderLeastRecent, orderMostRecent} = this.props.actions
        this.setState({order})
        let state = orderMostRecent()

        this.setState({state})
    }

    handleShow(filter) {
        this.setState({filter})
    }

    renderFooter(completedCount) {
        const {tasks} = this.props
        const {filter} = this.state
        const activeCount = tasks.length - completedCount

        if (tasks.length) {
            return (
                <Footer completedCount={completedCount}
                        activeCount={activeCount}
                        filter={filter}
                        onClearCompleted={this.handleClearCompleted.bind(this)}
                        onShow={this.handleShow.bind(this)}/>
            )
        }
    }

    renderOrderLink(order) {
        const title = ORDER_TITLES[order]
        const {order: selectedOrder} = this.state

        return (
            <a className={classnames({selected: order === selectedOrder})}
               style={{cursor: 'pointer'}}
               onClick={this.handleOrder}>
                {title}
            </a>
        )
    }

    render() {
        const {tasks, actions} = this.props
        const {filter} = this.state

        const filteredTasks = tasks.filter(TASK_FILTERS[filter])
        const completedCount = tasks.reduce((count, task) =>
                task.completed ? count + 1 : count,
            0
        )

        return (
            <section className="main">
                <ul className="filters fit-filters">
                    {[ORDER_MOST_RECENT, ORDER_LEAST_RECENT].map(order =>
                        <li key={order}>
                            {this.renderOrderLink(order)}
                        </li>
                    )}
                </ul>
                <ul className="todo-list">
                    {filteredTasks.map(task =>
                        <TaskItem key={task.id} task={task} {...actions} />
                    )}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        )
    }
}

MainSection.propTypes = {
    tasks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

export default MainSection
