import * as types from '../constants/ActionTypes'

export function orderList() {
    return {type: types.ORDER_LIST}
}

export function addTask(text) {
    return {type: types.ADD_TASK, text}
}

export function deleteTask(id) {
    return {type: types.DELETE_TASK, id}
}

export function completeTask(id) {
    return {type: types.COMPLETE_TASK, id}
}