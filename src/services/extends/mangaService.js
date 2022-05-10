import ServiceApi from '../serviceApi'

export default class Manga extends ServiceApi {
  async getPickManga () {
    try {
      const res = await this.get('/public/pickManga')
      return res.data
    } catch (err) {
      return err
    }
  }

  async getManga (id) {
    try {
      const res = await this.get(`/public/getManga/${id}`)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async getMangaFiltered (query) {
    try {
      const res = await this.get(`/public/mangaFiltered?${query}`)
      return res.data
    } catch (err) {
      return err
    }
  }

  async getTopManga () {
    try {
      const res = await this.get('/public/topManga')
      return res.data
    } catch (err) {
      return err
    }
  }

  async getMangaRecommendation (id) {
    try {
      const res = await this.get(`/public/${id}/recommendations`)
      return res.data
    } catch (err) {
      return err
    }
  }

  async getMostFavoritesManga () {
    try {
      const res = await this.get('/public/mostFavoritesManga')
      return res.data
    } catch (err) {
      return err
    }
  }
}
