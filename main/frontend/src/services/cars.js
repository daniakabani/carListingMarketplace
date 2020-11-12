import { HttpClient } from "../helpers";

const getAllCars = (brand = "", page = 1) => {
  return HttpClient({
    path: `cars?page_size=10&page=${page}&brand=${brand}`,
    method: 'GET'
  });
};

const getCarByID = id => {
  return HttpClient({
    path: `cars/${id}`,
    method: 'GET'
  });
};

const createCar = body => {
  return HttpClient({
    path: `cars`,
    method: 'POST',
    body
  });
};

const editCar = ({ id, body }) => {
  return HttpClient({
    path: `cars/${id}`,
    method: 'POST',
    body
  });
}

export {
  getAllCars,
  getCarByID,
  createCar,
  editCar
}