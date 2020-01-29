exports.seed = function(knex) {
  return knex("users").insert([
    { username: "zero", password: "lkjbIBy76fUIjhblbo878P98G" },
    { username: "MGustave", password: "IUHo87gOUY876guHbo878P98G" }
  ]);
};
