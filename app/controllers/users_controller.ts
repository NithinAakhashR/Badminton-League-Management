import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.ok(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['fullName', 'email', 'password', 'role'])

    try {
      const user = await User.create(data)
      return response.created({ message: 'User created', user })
    } catch (error) {
      return response.badRequest({ message: 'Failed to create user', error })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return response.ok(user)
    } catch {
      return response.notFound({ message: 'User not found' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      const data = request.only(['fullName', 'email', 'password', 'role'])

      user.merge(data)
      await user.save()

      return response.ok({ message: 'User updated', user })
    } catch (error) {
      return response.badRequest({ message: 'Update failed', error })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.ok({ message: 'User deleted' })
    } catch {
      return response.notFound({ message: 'User not found' })
    }
  }
}