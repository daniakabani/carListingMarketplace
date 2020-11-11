
exports.up = function(knex) {
  return knex.schema.createTable('listings', function (table) {
    table.increments('id').primary();
    table.integer('car_id').unsigned().references('cars.id').onDelete('CASCADE');
    table.timestamp('start_at');
    table.timestamp('end_at');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.timestamp('deleted_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('listings');
};
