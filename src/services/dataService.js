import ServiceApi from './serviceApi'

export default class Data extends ServiceApi {
  async getAnime (id) {
    try {
      const res = await this.get(`/stuff/getAnime/${id}`)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async insertAnime (payload) {
    try {
      const res = await this.post('/stuff/insertStuff', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async getAnimefiltered (query) {
    try {
      const res = await this.get(`/public/animeFiltered?${query}`)
      return res.data
    } catch (err) {
      return err
    }
  }
}
