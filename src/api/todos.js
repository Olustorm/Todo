import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = (page = 1, limit = 10) =>
  axios.get(`${API_BASE_URL}?_page=${page}&_limit=${limit}`);

export const getTodoById = (id) =>
  axios.get(`${API_BASE_URL}/${id}`);

export const createTodo = (todo) =>
  axios.post(API_BASE_URL, todo);

export const updateTodo = (id, todo) =>
  axios.put(`${API_BASE_URL}/${id}`, todo);

export const deleteTodo = (id) =>
  axios.delete(`${API_BASE_URL}/${id}`);
