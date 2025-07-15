import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('player_a_id').unsigned().references('id').inTable('players')
      table.integer('player_b_id').unsigned().references('id').inTable('players')
      table.integer('winner_id').unsigned().references('id').inTable('players')
      table.timestamp('played_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}