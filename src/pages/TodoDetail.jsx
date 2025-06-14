import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../hooks/useTodos';
import Loader from '../components/Loader';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading, isError } = useTodo(id);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center py-4 text-red-500">Error loading todo.</div>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
        <p className="mb-2">Status: {todo.completed ? 'Completed ✅' : 'Incomplete ❌'}</p>
        <p>ID: {todo.id}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </main>
  );
}
