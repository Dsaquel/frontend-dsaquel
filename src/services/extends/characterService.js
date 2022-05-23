import ServiceApi from '../serviceApi'

export default class Character extends ServiceApi {
   getCharacter =async (id) => {
     try {
       const res = await this.get(`/public/character/${id}`)
       return res.data
     } catch (err) {
       return err
     }
   }

   getTopCharacters =async () => {
     try {
       const res = await this.get('/public/topCharacters')
       return res.data
     } catch (err) {
       return err
     }
   }
}
