import axios from 'axios'

const apiURL = "http://localhost:5000/users"

export async function getAllUsers() {
    return await axios.get(`${apiURL}/getAllUsers`)
}
 export async function adduser(userData) {
     return await axios.post(`${apiURL}/addUser`,userData) 
 }

 export async function adduserwithImg(userData) {
    return await axios.post(`${apiURL}/addClient`,userData, {
        headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true,
    }) 
}
 export async function updateUser(userId,userData) {
     return await axios.put(`${apiURL}/updateUser/${userId}`,userData)
 }
 export async function deleteUser(id) {
     return await axios.delete(`${apiURL}/deleteUser/${id}`)
 }

 export async function getOrderAllUsersByAge() {
    return await axios.get(`${apiURL}/getOrderAllUsersByAge`)
}

export async function searchUsersByName(name) {
    return await axios.get(`${apiURL}/searchUsersByName/?name=${name}`)
}