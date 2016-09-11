import {ADD_TASK, DELETE_TASK, COMPLETE_TASK} from '../constants/ActionTypes'
import {ORDER_MOST_RECENT, ORDER_LEAST_RECENT} from '../constants/TaskOrder'

let initialState = []
let cachedState = JSON.parse(localStorage.cargoBrState)
if(Array.isArray(cachedState)) {
    initialState = cachedState
}

function updateCache(state) {
    localStorage.setItem('cargoBrState', JSON.stringify(state))
}

export default function tasks(state = initialState, action) {
    let nState = []

    switch (action.type) {
        case ORDER_MOST_RECENT:
            nState = state.reverse()
            updateCache(nState)

            return nState

        case ORDER_LEAST_RECENT:
            nState = state.reverse()
            updateCache(nState)

            return nState

        case ADD_TASK:
            nState = [
                {
                    id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text
                },
                ...state
            ]
            updateCache(nState)

            return nState

        case DELETE_TASK:
            nState = state.filter(task =>
                task.id !== action.id
            )
            updateCache(nState)

            return nState

        case COMPLETE_TASK:
            nState = state.map(task =>
                task.id === action.id ?
                {...task, completed: !task.completed} :
                    task
            )
            updateCache(nState)

            return nState

        default:
            return state
    }
}
