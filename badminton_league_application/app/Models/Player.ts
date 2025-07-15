import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare rank: number

  @column()
  declare wins: number

  @column()
  declare losses: number

  @hasMany(() => Match, { foreignKey: 'playerAId' })
  public matchesAsA: HasMany<typeof Match>

  @hasMany(() => Match, { foreignKey: 'playerBId' })
  public matchesAsB: HasMany<typeof Match>

  @hasMany(() => Match, { foreignKey: 'winnerId' })
  public winsRecord: HasMany<typeof Match>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}