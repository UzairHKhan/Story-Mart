

const setRegisteredUsers = (arr) => {
    localStorage.setItem('RegisteredUser', JSON.stringify(arr))
}
const setLoggedInUser = (obj) => {
    localStorage.setItem('LoggedInUser', JSON.stringify(obj))
}
const getRegisteredUsers = () => {
    return JSON.parse(localStorage.getItem('RegisteredUser') || "[]")
}
const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('LoggedInUser') || "{}")
}

export { setRegisteredUsers, setLoggedInUser, getRegisteredUsers, getLoggedInUser }