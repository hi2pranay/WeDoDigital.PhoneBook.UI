import axios from 'axios'

export default axios.create({
  baseURL: 'https://localhost:7241/api/v1/phonebook/',
  headers: {
    'Content-type': 'application/json'
  }
});