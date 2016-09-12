export function getLocalStorage() {
    let cachedState = localStorage.cargoBrState
    if(cachedState !== undefined){
        return JSON.parse(cachedState)
    }

    return {}
}

export function updateCache(state) {
    let nState = Object.assign(getLocalStorage(), state)
    localStorage.setItem('cargoBrState', JSON.stringify(nState))
}