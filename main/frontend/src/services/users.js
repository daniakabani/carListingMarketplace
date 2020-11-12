import { HttpClient } from "../helpers/index";

const Login = body => {
  return HttpClient({
    path: 'users/login',
    method: 'POST',
    body
  })
};

const getAllUsers = (username = "", page = 1) => {
  return HttpClient({
    path: `users?page_size=10&page=${page}&username=${username}`,
    method: 'GET'
  });
};

const getUserByID = id => {
  return HttpClient({
    path: `users/${id}`,
    method: 'GET'
  });
};

const createUser = body => {
  return HttpClient({
    path: "users",
    method: "POST",
    body
  })
};

const updateUser = (id, body) => {
  return HttpClient({
    path: `users/${id}`,
    method: "POST",
    body
  })
};

export {
  Login,
  getAllUsers,
  getUserByID,
  createUser,
  updateUser
}