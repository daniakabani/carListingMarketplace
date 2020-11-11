const ListingsService = require('daniakabani/services/listings');

const listings = [
  {
    car_id: 1,
    start_at: '12/12/2020',
    end_at: '12/13/2020'
  },
  {
    car_id: 2,
    start_at: '12/12/2020',
    end_at: '12/13/2020'
  },
  {
    car_id: 3,
    start_at: '12/12/2020',
    end_at: '12/13/2020'
  }
]

exports.seed = async () => {
  for (let start = 0; start < listings.length; start++) {
    await ListingsService.create({
      end_at: listings[start].end_at,
      start_at: listings[start].start_at,
      car_id: listings[start].car_id
    })
  }
}