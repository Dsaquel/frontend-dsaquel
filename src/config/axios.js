import axios from 'redaxios'

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})
