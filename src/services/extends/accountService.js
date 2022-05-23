import ServiceApi from '../serviceApi'

export default class Account extends ServiceApi {
   login = async (payload) => {
     try {
       const res = await this.post('/auth/login', payload)
       return res.data?.token
     } catch (err) {
       return err.data
     }
   }

   signUp = async (payload) => {
     try {
       const res = await this.post('/auth/signup', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   resendLink = async (payload) => {
     try {
       const res = await this.post('/auth/resendLink', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   resetPassword = async (payload) => {
     try {
       const res = await this.put('/auth/resetPassword', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   emailConfirmation = async (payload) => {
     try {
       const res = await this.get(
        `/auth/confirmation/${payload.email}/${payload.token}`
       )
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   linkPasswordReset = async (payload) => {
     try {
       const res = await this.post('/auth/linkPasswordReset', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   insertStuff = async (payload) => {
     try {
       const res = await this.post('/stuff/insertStuff', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   getUserStuff = async (token) => {
     try {
       const res = await this.get(`/stuff/getUserStuff/${token}`)
       return res.data
     } catch (err) {
       return err.data
     }
   }

   getUserProfile = async (token) => {
     try {
       const res = await this.get(`/auth/userProfile/${token}`)
       return res.data
     } catch (err) {
       return err.data
     }
   }

   editUserProfile = async (payload) => {
     try {
       const res = await this.put('/auth/editUserProfile', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   deleteUserStuff = async (payload) => {
     try {
       const res = await this.delete('/stuff/deleteUserStuff', payload)
       return res.data
     } catch (err) {
       return err.data
     }
   }

   deleteAccount = async (payload) => {
     try {
       const res = await this.put('/auth/deleteAccount', payload)
       return res.data?.message
     } catch (err) {
       return err.data
     }
   }

   recupAccountByPassword = async (payload) => {
     try {
       const res = await this.put('/auth/recupAccountByPassword', payload)
       return res.data?.token
     } catch (err) {
       return err.data
     }
   }

   recupAccountByBtn = async (payload) => {
     try {
       const res = await this.put('/auth/recupAccountByBtn', payload)
       return res.data?.token
     } catch (err) {
       return err.data
     }
   }
}
