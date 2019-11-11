exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id')
        table.text('VIN').notNullable();
        table.unique('VIN');
        table.text('make').notNullable();
        table.text('model').notNullable();
        table.integer('mileage').notNullable();
        table.text('transmission_type')
        table.text('status')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };
  