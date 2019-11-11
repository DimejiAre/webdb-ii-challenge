
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '3302', make:"Toyota", model:"Camry", mileage:74},
        {VIN: '2242', make:"Toyota", model:"Camry", mileage:21},
        {VIN: '1293', make:"Toyota", model:"Camry", mileage:0, transmission_type: 'Automatic', 'status': 'clean'}
      ]);
    });
};
