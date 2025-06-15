import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as todoAPI from '../api/todos';
import { db } from '../db';
import axios from 'axios';



export const useTodos = (page) => {
  const BASE_API_URL = 'https://jsonplaceholder.typicode.com/todos';

  return useQuery({
    queryKey: ['todos', page],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API_URL}?_limit=10&_page=${page}`);
      await db.todos.bulkPut(res.data); // Save to IndexedDB
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,

  });

};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => todoAPI.getTodoById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoAPI.createTodo,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...todo }) => todoAPI.updateTodo(id, todo),
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoAPI.deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });
};
