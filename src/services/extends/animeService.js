import ServiceApi from '../serviceApi'

export default class Anime extends ServiceApi {
  async getAnime (id) {
    try {
      const res = await this.get(`/public/getAnime/${id}`)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async getAnimeFiltered (query) {
    try {
      const res = await this.get(`/public/animeFiltered?${query}`)
      return res.data
    } catch (err) {
      return err
    }
  }

  async getAnimeSeasonNow () {
    try {
      const res = await this.get('/public/animeSeasonNow')
      return res.data
    } catch (err) {
      return err
    }
  }

  async getAnimeUpComing () {
    try {
      const res = await this.get('/public/animeUpComing')
      return res.data
    } catch (err) {
      return err
    }
  }

  async getReviewsAnime () {
    try {
      const res = await this.get('/public/topReviewsAnime')
      return res.data
    } catch (err) {
      return err
    }
  }
}
