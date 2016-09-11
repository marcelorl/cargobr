import React, {PropTypes, Component} from 'react'
import TaskTextInput from './TaskTextInput'
import classnames from 'classnames'
import {ORDER_MOST_RECENT, ORDER_LEAST_RECENT} from '../constants/TaskOrder'

const ORDER_TITLES = {
    [ORDER_MOST_RECENT]: 'Mais recentes',
    [ORDER_LEAST_RECENT]: 'Mais antigas'
}

class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {order: ORDER_MOST_RECENT}

        this.handleSave = this.handleSave.bind(this)
        this.handleOrder = this.handleOrder.bind(this)
    }

    handleOrder(order) {
        //console.log(order)
        let {orderLeastRecent, orderMostRecent} = this.props.actions
        this.setState({order})
        let state = orderMostRecent()
console.log(state)
        this.setState({state})
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.actions.addTask(text)
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
        return (
            <header className="header">
                <h1>tasks</h1>
                <TaskTextInput newTask
                               onSave={this.handleSave}
                               placeholder="O que você tem que fazer?"/>
                <ul className="filters">
                    {[ORDER_MOST_RECENT, ORDER_LEAST_RECENT].map(order =>
                        <li key={order}>
                            {this.renderOrderLink(order)}
                        </li>
                    )}
                </ul>
            </header>
        )
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired
}

export default Header
