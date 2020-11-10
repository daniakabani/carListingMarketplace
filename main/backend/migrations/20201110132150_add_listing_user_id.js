
exports.up = function(knex) {
  return knex.schema.table('listings', function (table) {
    table.integer('user_id').unsigned().references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('listings', function (table) {
    table.dropColumn('user_id');
  });
};
