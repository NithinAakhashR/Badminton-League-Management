  import { DateTime } from 'luxon'
  import Hash from '@adonisjs/core/services/hash'
  import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'

  export default class User extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    @column()
    declare role: 'admin' | 'user'

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
      if (user.$dirty.password) {
        user.password = await Hash.make(user.password)
      }
    }
  }