
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique().index();
    table.string('role');
    table.string('tag');
    table.integer('car_id').unsigned().references('cars.id');
    table.integer('listing_id').unsigned().references('listings.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.timestamp('deleted_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
