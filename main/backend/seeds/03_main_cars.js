const CarsService = require('daniakabani/services/cars');

const cars = [
  {
    brand: 'BMW',
    day_price: 180,
    user_id: 1,
    featured: true,
    model: "X5",
    year: 2020,
    geo_location: {
      lat: 3.140853,
      lng: 101.693207
    }
  },
  {
    brand: 'Mercedes',
    day_price: 200,
    user_id: 1,
    featured: true,
    year: 2020,
    model: "Benz",
    geo_location: {
      lat: 3.140853,
      lng: 101.693207
    }
  },
  {
    brand: 'Audi',
    day_price: 220,
    user_id: 1,
    featured: true,
    model: "R8",
    year: 2020,
    geo_location: {
      lat: 3.140853,
      lng: 101.693207
    }
  }
]

exports.seed = async () => {
  for (let start = 0; start < cars.length; start++) {
    await CarsService.create({
      brand: cars[start].brand,
      day_price: cars[start].day_price,
      user_id: cars[start].user_id,
      featured: cars[start].featured,
      model: cars[start].model,
      geo_location: cars[start].geo_location,
      year: cars[start].year
    })
  }
}