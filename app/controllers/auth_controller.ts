import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const data = request.only(['fullName', 'email', 'password'])

    try {
      const user = await User.create(data)
      return response.created({ message: 'User registered', user })
    } catch (error) {
      return response.badRequest({ message: 'Registration failed', error })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.ok({ token })
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.ok({ message: 'Logged out successfully' })
    } catch (error) {
      return response.internalServerError({ message: 'Logout failed', error })
    }
  }
}