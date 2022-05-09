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

  async getPagination (page) {
    try {
    //   const url = localStorage.getItem('url')
    //   const res = await fetch(`${url}?&page=${page}`)
      const res = await this.get('/public/pagination')
      console.log(res?.data)
      return res.data
    } catch (err) {
      return err
    }
  }

  async getAnimefiltered (query) {
    try {
      console.log(query)
      const res = await this.get(`/public/animeFiltered?${query}`)
      console.log(res)
      return res.data
    } catch (err) {
      return err
    }
  }
}
