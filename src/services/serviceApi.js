import axios from 'redaxios'

export default class ServiceApi {
  get = (ressource) => {
    return axios.get(`${process.env.VUE_APP_API_URL}${ressource}`)
  }

  post = (ressource, payload) => {
    return axios.post(`${process.env.VUE_APP_API_URL}${ressource}`, payload)
  }

  put = (ressource, payload) => {
    return axios.put(`${process.env.VUE_APP_API_URL}${ressource}`, payload)
  }

  delete = (ressource, payload) => {
    return axios.delete(`${process.env.VUE_APP_API_URL}${ressource}`, { data: payload })
  }
}
