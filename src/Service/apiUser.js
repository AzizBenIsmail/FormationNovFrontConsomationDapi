import axios from 'axios'

const apiURL = "http://localhost:5000/users"

export async function getAllUsers() {
    return await axios.get(`${apiURL}/getAllUsers`)
}
 export async function adduser(userData) {
     return await axios.post(`${apiURL}/addUser`,userData) 
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