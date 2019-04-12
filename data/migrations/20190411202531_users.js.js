
exports.up = function(knex, Promise) {
    return knex.schema.creteTable('users', users => {
        users.increment();

        users
        .string('username', 128)
        .notNullable()
        .unique()

        users.string('password', 128).notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
