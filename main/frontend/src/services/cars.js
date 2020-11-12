import { HttpClient } from "../helpers";

const getAllCars = (brand = "", page = 1) => {
  return HttpClient({
    path: `cars?page_size=10&page=${page}&brand=${brand}`,
    method: 'GET'
  });
};

export {
  getAllCars
}