import React, {Component, PropTypes} from 'react'
import TaskItem from './TaskItem'
import Footer from './Footer'
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TaskFilters'
import classnames from 'classnames'
import {ORDER_MOST_RECENT, ORDER_LEAST_RECENT} from '../constants/ActionTypes'
import {getLocalStorage, updateCache} from '../Utils'

const TASK_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_COMPLETED]: task => task.completed
}

const ORDER_TITLES = {
    [ORDER_MOST_RECENT]: 'Mais recentes',
    [ORDER_LEAST_RECENT]: 'Mais antigas'
}

class MainSection extends Component {
    constructor(props, context) {
        super(props, context)

        let order = ORDER_MOST_RECENT
        let cachedState = getLocalStorage()

        if(typeof cachedState === 'object' && cachedState.order) {
            order = cachedState.order
        }

        this.state = {filter: SHOW_ALL, order}
    }

    handleOrder(order, selectedOrder) {
        let cachedState = getLocalStorage()
        cachedState.order = order

        updateCache(cachedState)

        if(order !== selectedOrder) {
            this.props.actions.orderList()
            this.setState({order})
        }
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
                        onShow={this.handleShow.bind(this)}/>
            )
        }
    }

    renderOrderList(tasks) {
        if(tasks.length) {
            return (
                <ul className="filters fit-filters">
                    {[ORDER_MOST_RECENT, ORDER_LEAST_RECENT].map(order =>
                        <li key={order}>
                            {this.renderOrderLink(order)}
                        </li>
                    )}
                </ul>
            )
        }
    }

    renderOrderLink(order) {
        const title = ORDER_TITLES[order]
        const {order: selectedOrder} = this.state

        return (
            <a className={classnames({selected: order === selectedOrder})}
               style={{cursor: 'pointer'}}
               onClick={() => this.handleOrder(order, selectedOrder)}>
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
                {this.renderOrderList(filteredTasks)}
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
