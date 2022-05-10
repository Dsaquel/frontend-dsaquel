import ServiceApi from '../serviceApi'

export default class Data extends ServiceApi {
  async getCharacter (id) {
    try {
      const res = await this.get(`/public/character/${id}`)
      return res.data
    } catch (err) {
      return err
    }
  }

  async getTopCharacters () {
    try {
      const res = await this.get('/public/topCharacters')
      return res.data
    } catch (err) {
      return err
    }
  }
}
