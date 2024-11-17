import axios from 'axios'

const apiURL = "http://localhost:5000/users"

export async function getAllUsers() {
    return await axios.get(`${apiURL}/getAllUsers`)
}
// export async function adduser() {
//     return await axios.get(`${apiURL}/gettAllUsers`)
// }
// export async function updateUser() {
//     return await axios.get(`${apiURL}/gettAllUsers`)
// }
// export async function deletUser() {
//     return await axios.get(`${apiURL}/gettAllUsers`)
// }
