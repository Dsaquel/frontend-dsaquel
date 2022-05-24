import axiosInstance from '@/config/axios'

export default class ServiceApi {
  get = (ressource) => {
    try {
      return axiosInstance.get(ressource)
    } catch (error) {
      console.log(error)
    }
  }

  post = (ressource, payload) => {
    try {
      return axiosInstance.post(ressource, payload)
    } catch (error) {
      console.log(error)
    }
  }

  put = (ressource, payload) => {
    try {
      return axiosInstance.put(ressource, payload)
    } catch (error) {
      console.log(error)
    }
  }

  delete = (ressource, payload) => {
    try {
      return axiosInstance.delete(ressource, { data: payload })
    } catch (error) {
      console.log(error)
    }
  }
}
