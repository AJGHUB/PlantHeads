exports.up = function(knex) {
    return knex.schema.createTable('listing', (table) => {
        table.integer('id').primary()
        table.integer('plants_id')
        table.string('scientific_name')
        table.integer('users_id')
        table.integer('cost')
        table.string('common_name')
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('listing')
  }