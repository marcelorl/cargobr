import {ADD_TASK, DELETE_TASK, COMPLETE_TASK, ORDER_MOST_RECENT, ORDER_LEAST_RECENT} from '../constants/ActionTypes'
import {getLocalStorage, updateCache} from '../Utils'

let initialState = []
let cachedState = getLocalStorage()

if(cachedState !== undefined && Array.isArray(cachedState.tasks)) {
    initialState = cachedState.tasks
}

export default function tasks(state = initialState, action) {
    let nState = []

    switch (action.type) {
        case ORDER_MOST_RECENT:
            state.sort(function(a, b) {
                return a.timestamp + b.timestamp;
            })

            updateCache({tasks: state})

            return state

        case ORDER_LEAST_RECENT:
            state.sort(function(a, b) {
                return a.timestamp - b.timestamp;
            })
            updateCache({tasks: state})

            return state

        case ADD_TASK:
            nState = [
                {
                    id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text,
                    timestamp: Math.floor(Date.now() / 1000)
                },
                ...state
            ]
            updateCache({tasks: nState})

            return nState

        case DELETE_TASK:
            nState = state.filter(task =>
                task.id !== action.id
            )
            updateCache({tasks: nState})
            updateCache({order: ORDER_MOST_RECENT})

            return nState

        case COMPLETE_TASK:
            nState = state.map(task =>
                task.id === action.id ?
                {...task, completed: !task.completed} :
                    task
            )
            updateCache({tasks: nState})

            return nState

        default:
            return state
    }
}
