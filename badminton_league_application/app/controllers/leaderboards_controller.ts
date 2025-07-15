import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from 'App/Models/Player'

export default class LeaderboardController {
  public async index({ response }: HttpContextContract) {
    const players = await Player.query()
      .orderBy('wins', 'desc')
      .orderBy('losses', 'asc')

    return response.ok(players)
  }
}