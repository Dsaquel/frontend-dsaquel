import ServiceApi from './serviceApi'

export default class Account extends ServiceApi {
  async login (payload) {
    const res = await this.post('/login', payload)
    return res.data?.success?.data
  }
}
