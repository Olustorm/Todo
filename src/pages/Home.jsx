import { useState } from 'react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';
import TodoItem from '../components/TodoItem';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const { data: todos, isLoading, isError } = useTodos(page);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(200 / 10)) {
      setPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSaveTodo = (todoData) => {
    if (editingTodo) {
      updateTodoMutation.mutate({ id: editingTodo.id, ...todoData });
    } else {
      createTodoMutation.mutate(todoData);
    }
    setEditingTodo(null);
    setIsModalOpen(false);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodoMutation.mutate(id);
    }
  };

  const filteredTodos = todos?.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'completed' ? todo.completed :
      !todo.completed;

    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <Loader />;
  if (isError) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-500">Error fetching todos. Please try again later.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ✨ Todo Manager
          </h1>
          <p className="text-gray-600 text-lg">Organize your tasks with style</p>
        </div>

        {/* Add Todo Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => { setEditingTodo(null); setIsModalOpen(true); }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Todo
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search todos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/80"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/80"
              >
                <option value="all">🌟 All Tasks</option>
                <option value="completed">✅ Completed</option>
                <option value="incomplete">⏳ Incomplete</option>
              </select>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          {filteredTodos && filteredTodos.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredTodos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No todos found</h3>
              <p className="text-gray-500">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter' 
                  : 'Create your first todo to get started!'
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={20}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodoForm
            initialData={editingTodo}
            onSave={handleSaveTodo}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}