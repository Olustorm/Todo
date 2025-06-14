import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as todoAPI from '../api/todos';
import { db } from '../db';
import axios from 'axios';

const BASE_API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const useTodos = (page) => {
  return useQuery({
    queryKey: ['todos', page],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}?_limit=10&_page=${page}`);
        // Save to IndexedDB for offline access
        await db.todos.bulkPut(res.data.map(todo => ({
          ...todo,
          synced: true
        })));
        return res.data;
      } catch (error) {
        // If network fails, try to get from IndexedDB
        console.log('Network failed, trying offline data...');
        const offlineTodos = await db.todos
          .orderBy('id')
          .offset((page - 1) * 10)
          .limit(10)
          .toArray();
        
        if (offlineTodos.length > 0) {
          return offlineTodos;
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (replaces cacheTime)
  });
};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      try {
        const res = await todoAPI.getTodoById(id);
        // Save to IndexedDB
        await db.todos.put({ ...res.data, synced: true });
        return res.data;
      } catch (error) {
        // Try offline data
        const offlineTodo = await db.todos.get(parseInt(id));
        if (offlineTodo) {
          return offlineTodo;
        }
        throw error;
      }
    },
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo) => {
      try {
        const res = await todoAPI.createTodo(todo);
        // Save to IndexedDB
        await db.todos.put({ ...res.data, synced: true });
        return res.data;
      } catch (error) {
        // Save locally with temporary ID for offline
        const tempId = Date.now();
        const offlineTodo = { ...todo, id: tempId, synced: false };
        await db.todos.put(offlineTodo);
        return offlineTodo;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...todo }) => {
      try {
        const res = await todoAPI.updateTodo(id, todo);
        // Update in IndexedDB
        await db.todos.put({ ...res.data, synced: true });
        return res.data;
      } catch (error) {
        // Update locally for offline
        const updatedTodo = { ...todo, id, synced: false };
        await db.todos.put(updatedTodo);
        return updatedTodo;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        await todoAPI.deleteTodo(id);
        // Remove from IndexedDB
        await db.todos.delete(id);
        return id;
      } catch (error) {
        // Mark as deleted locally for offline
        await db.todos.update(id, { deleted: true, synced: false });
        return id;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};