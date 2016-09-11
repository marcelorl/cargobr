import * as types from '../constants/ActionTypes'

export function orderMostRecent() {
    return {type: types.ORDER_MOST_RECENT}
}

export function orderLeastRecent() {
    return {type: types.ORDER_LEAST_RECENT}
}

export function addTask(text) {
    return {type: types.ADD_TASK, text}
}

export function deleteTask(id) {
    return {type: types.DELETE_TASK, id}
}

export function editTask(id, text) {
    return {type: types.EDIT_TASK, id, text}
}

export function completeTask(id) {
    return {type: types.COMPLETE_TASK, id}
}

export function completeAll() {
    return {type: types.COMPLETE_ALL}
}
