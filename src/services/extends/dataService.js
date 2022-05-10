import ServiceApi from '../serviceApi'

export default class Data extends ServiceApi {
  async getAnime (id) {
    try {
      const res = await this.get(`/public/getAnime/${id}`)
      return res.data
    } catch (err) {
      return err.data
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

  async getCharacter (id) {
    try {
      const res = await this.get(`/public/character/${id}`)
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

  async getReviewsAnime () {
    try {
      const res = await this.get('/public/topReviewsAnime')
      return res.data
    } catch (err) {
      return err
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

  async getMangaFiltered (query) {
    try {
      const res = await this.get(`/public/mangaFiltered?${query}`)
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

  async getTopCharacters () {
    try {
      const res = await this.get('/public/topCharacters')
      return res.data
    } catch (err) {
      return err
    }
  }

  async getPickManga () {
    try {
      const res = await this.get('/public/pickManga')
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
