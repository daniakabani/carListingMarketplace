exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("uuid", 255).notNullable().unique().index();
    table
      .integer("assigned_user")
      .unsigned()
      .references("users.id")
      .onDelete("CASCADE");
    table.string("status");
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
