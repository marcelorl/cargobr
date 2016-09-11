import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import {SHOW_ALL, SHOW_COMPLETED} from '../constants/TaskFilters'

const FILTER_TITLES = {
    [SHOW_ALL]: 'Todas',
    [SHOW_COMPLETED]: 'Completadas'
}

class Footer extends Component {
    renderTaskCount() {
        const {activeCount} = this.props
        const itemWord = activeCount === 1 ? 'tarefa' : 'tarefas'

        return (
            <span className="todo-count">
                <strong>{activeCount || 'Sem'}</strong> {itemWord} sobrando
            </span>
        )
    }

    renderFilterLink(filter) {
        const title = FILTER_TITLES[filter]
        const {filter: selectedFilter, onShow} = this.props

        return (
            <a className={classnames({selected: filter === selectedFilter})}
               style={{cursor: 'pointer'}}
               onClick={() => onShow(filter)}>
                {title}
            </a>
        )
    }

    renderClearButton() {
        const {completedCount, onClearCompleted} = this.props
        if (completedCount > 0) {
            return (
                <button className="clear-completed"
                        onClick={onClearCompleted}>
                    Clear completed
                </button>
            )
        }
    }

    render() {
        return (
            <footer className="footer">
                {this.renderTaskCount()}
                <ul className="filters">
                    {[SHOW_ALL, SHOW_COMPLETED].map(filter =>
                        <li key={filter}>
                            {this.renderFilterLink(filter)}
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </footer>
        )
    }
}

Footer.propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
}

export default Footer
