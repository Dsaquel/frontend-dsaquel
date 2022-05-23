import ServiceApi from '../serviceApi'

export default class Mail extends ServiceApi {
   sendMessage = async (payload) => {
     try {
       const res = await this.post('/public/sendMessage', payload)
       return res.data?.message
     } catch (error) {
       return error.data
     }
   }
}
