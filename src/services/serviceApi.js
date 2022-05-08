import axios from 'redaxios'

export default class ServiceApi {
//   get (ressource, payload) { }

  post (ressource, payload) {
    return axios.post(`${process.env.VUE_APP_API_URL}${ressource}`, payload)
  }
}
