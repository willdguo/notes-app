import axios from "axios"
const baseUrl = "/api/notes" // https://111-notesapp-backend.vercel.app

let token = null //current token used

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token }, 
    }

    console.log('new token: ')
    console.log(token)

    return axios.get(baseUrl, config)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }, 
    }
    
    // console.log(token)
    // console.log(config)

    const response = await axios.post(baseUrl, newObject, config)
    console.log('response data: ')
    console.log(response.data)
    console.log(response.data.id)
    return response.data
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = async (id) => {
    const config = {
        headers: {Authorization: token}, 
    }

    // console.log(token)
    // console.log(config)

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    update,
    remove,
    setToken,
}