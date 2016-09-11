import {ADD_TASK, DELETE_TASK, COMPLETE_TASK, ORDER_LIST} from '../constants/ActionTypes'

let initialState = []
let cachedState = localStorage.cargoBrState
if(cachedState !== undefined){
    cachedState = JSON.parse(cachedState)
}

if(Array.isArray(cachedState.tasks)) {
    initialState = cachedState.tasks
}

function updateCache(state) {
    localStorage.setItem('cargoBrState', JSON.stringify({tasks: state}))
}

export default function tasks(state = initialState, action) {
    let nState = []

    switch (action.type) {
        case ORDER_LIST:
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
