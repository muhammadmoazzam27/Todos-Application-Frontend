import { message } from "antd"

window.isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

window.toastify = (msg, type) => {
    return message[type](msg)
}