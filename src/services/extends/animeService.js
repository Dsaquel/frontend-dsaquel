import ServiceApi from '../serviceApi'

export default class Anime extends ServiceApi {
   getAnime = async (id) => {
     try {
       const res = await this.get(`/public/anime/${id}`)
       return res.data
     } catch (err) {
       return err.data
     }
   }

   getAnimeFiltered = async (query) => {
     try {
       const res = await this.get(`/public/animeFiltered?${query}`)
       return res.data
     } catch (err) {
       return err
     }
   }

   getAnimeSeasonNow = async () => {
     try {
       const res = await this.get('/public/animeSeasonNow')
       return res.data
     } catch (err) {
       return err
     }
   }

   getAnimeUpComing = async () => {
     try {
       const res = await this.get('/public/animeUpComing')
       return res.data
     } catch (err) {
       return err
     }
   }

   getReviewsAnime = async () => {
     try {
       const res = await this.get('/public/topReviewsAnime')
       return res.data
     } catch (err) {
       return err
     }
   }
}
