import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from 'App/Models/Player'

export default class PlayersController {
  public async index({ response }: HttpContextContract) {
    const players = await Player.all()
    return response.ok(players)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'rank', 'wins', 'losses'])
    const player = await Player.create(data)
    return response.created(player)
  }

  public async show({ params, response }: HttpContextContract) {
    const player = await Player.findOrFail(params.id)
    return response.ok(player)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const player = await Player.findOrFail(params.id)
    const data = request.only(['name', 'rank', 'wins', 'losses'])

    player.merge(data)
    await player.save()

    return response.ok(player)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const player = await Player.findOrFail(params.id)
    await player.delete()

    return response.ok({ message: 'Player deleted' })
  }
}