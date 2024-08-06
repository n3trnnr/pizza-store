
export const getState = (key: string) => {
    const data = localStorage.getItem(key)
    if (!data) return null
    return JSON.parse(data)
}

export const saveState = (key: string, state: any) => {
    const jsonState = JSON.stringify(state)
    localStorage.setItem(key, jsonState)
}
