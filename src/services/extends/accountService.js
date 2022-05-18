import ServiceApi from '../serviceApi'

export default class Account extends ServiceApi {
  async login (payload) {
    try {
      const res = await this.post('/auth/login', payload)
      return res.data?.token
    } catch (err) {
      return err.data
    }
  }

  async signUp (payload) {
    try {
      const res = await this.post('/auth/signup', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async resendLink (payload) {
    try {
      const res = await this.post('/auth/resendLink', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async resetPassword (payload) {
    try {
      const res = await this.put('/auth/resetPassword', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async emailConfirmation (payload) {
    try {
      const res = await this.get(
        `/auth/confirmation/${payload.email}/${payload.token}`
      )
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async linkPasswordReset (payload) {
    try {
      const res = await this.post('/auth/linkPasswordReset', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async insertStuff (payload) {
    try {
      const res = await this.post('/stuff/insertStuff', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async getUserStuff (token) {
    try {
      const res = await this.get(`/stuff/getUserStuff/${token}`)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async getUserProfile (token) {
    try {
      const res = await this.get(`/auth/userProfile/${token}`)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async editUserProfile (payload) {
    try {
      const res = await this.put('/auth/editUserProfile', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async deleteUserStuff (payload) {
    try {
      const res = await this.delete('/stuff/deleteUserStuff', payload)
      return res.data
    } catch (err) {
      return err.data
    }
  }

  async deleteAccount (payload) {
    try {
      const res = await this.put('/auth/deleteAccount', payload)
      return res.data?.message
    } catch (err) {
      return err.data
    }
  }

  async recupAccountByPassword (payload) {
    try {
      const res = await this.put('/auth/recupAccountByPassword', payload)
      return res.data?.token
    } catch (err) {
      return err.data
    }
  }

  async recupAccountByBtn (payload) {
    try {
      const res = await this.put('/auth/recupAccountByBtn', payload)
      return res.data?.token
    } catch (err) {
      return err.data
    }
  }
}
