import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TaskActions from '../actions'

class App extends Component {
    render() {
        const {tasks, actions} = this.props
        return (
            <div>
                <Header actions={actions} />
                <MainSection tasks={tasks} actions={actions}/>
            </div>
        )
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TaskActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
