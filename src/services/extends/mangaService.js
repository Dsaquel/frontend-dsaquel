import ServiceApi from '../serviceApi'

export default class Manga extends ServiceApi {
   getPickManga = async () => {
     try {
       const res = await this.get('/public/pickManga')
       return res.data
     } catch (err) {
       return err
     }
   }

   getManga = async (id) => {
     try {
       const res = await this.get(`/public/manga/${id}`)
       return res.data
     } catch (err) {
       return err.data
     }
   }

   getMangaFiltered = async (query) => {
     try {
       const res = await this.get(`/public/mangaFiltered?${query}`)
       return res.data
     } catch (err) {
       return err
     }
   }

   getTopManga = async () => {
     try {
       const res = await this.get('/public/topManga')
       return res.data
     } catch (err) {
       return err
     }
   }

   getMangaRecommendation = async (id) => {
     try {
       const res = await this.get(`/public/${id}/recommendations`)
       return res.data
     } catch (err) {
       return err
     }
   }

   getMostFavoritesManga = async () => {
     try {
       const res = await this.get('/public/mostFavoritesManga')
       return res.data
     } catch (err) {
       return err
     }
   }
}
