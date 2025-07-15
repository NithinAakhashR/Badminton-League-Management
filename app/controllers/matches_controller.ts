import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Match from 'App/Models/Match'
import Player from 'App/Models/Player'

export default class MatchController {
  public async index({ response }: HttpContextContract) {
    const matches = await Match.query()
      .preload('playerA')
      .preload('playerB')
      .preload('winner')
    return response.ok(matches)
  }

  public async show({ params, response }: HttpContextContract) {
    const match = await Match.findOrFail(params.id)
    return response.ok(match)
  }

  public async store({ request, response }: HttpContextContract) {
    const { playerAId, playerBId, winnerId } = request.only([
      'playerAId',
      'playerBId',
      'winnerId',
    ])

    const loserId = playerAId === winnerId ? playerBId : playerAId

    const match = await Match.create({ playerAId, playerBId, winnerId })

    // Update player stats
    const winner = await Player.findOrFail(winnerId)
    const loser = await Player.findOrFail(loserId)

    winner.wins += 1
    await winner.save()

    loser.losses += 1
    await loser.save()

    return response.created({ message: 'Match recorded', match })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const match = await Match.findOrFail(params.id)
    await match.delete()
    return response.ok({ message: 'Match deleted' })
  }
}