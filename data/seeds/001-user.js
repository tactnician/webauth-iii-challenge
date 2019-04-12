
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: "Alpha",
      password: 'Omega'
    }
  ]);
};
