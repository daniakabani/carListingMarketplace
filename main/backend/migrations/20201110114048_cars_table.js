
exports.up = function(knex) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary();
    table.string('brand').index();
    table.string('model');
    table.integer('year');
    table.integer('day_price');
    table.boolean('featured');
    table.jsonb('geo_location');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.timestamp('deleted_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};
