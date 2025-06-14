import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from '../components/TodoItem';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: todos, isLoading, isError } = useTodos(page);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(200 / 10)) { // JSONPlaceholder has 200 todos
      setPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTodos = todos?.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'completed' ? todo.completed :
      !todo.completed;

    return matchesSearch && matchesFilter;
  });
  console.log(todos);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center py-4 text-red-500">Error fetching todos.</div>;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-4 flex-col sm:flex-row justify-between">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {filteredTodos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={20} // JSONPlaceholder has 200 todos, 10 per page
        onPageChange={handlePageChange}
      />
    </main>
  );
}
