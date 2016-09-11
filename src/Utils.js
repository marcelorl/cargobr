export function getLocalStorage() {
    let cachedState = localStorage.cargoBrState
    if(cachedState !== undefined){
        cachedState = JSON.parse(cachedState)
    }

    return cachedState
}

export function updateCache(state) {
    let nState = Object.assign(getLocalStorage(), state)
    localStorage.setItem('cargoBrState', JSON.stringify(nState))
}