import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../hooks/useTodos';
import Loader from '../components/Loader';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading, isError } = useTodo(id);

  if (isLoading) return <Loader />;
  
  if (isError) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 text-center max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Todo</h2>
        <p className="text-red-500 mb-6">We couldn't load this todo. Please try again.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-2xl pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            📋 Todo Details
          </h1>
          <p className="text-gray-600">View your task information</p>
        </div>

        {/* Todo Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Task #{todo.id}</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                todo.completed 
                  ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                  : 'bg-orange-100 text-orange-800 border-2 border-orange-200'
              }`}>
                {todo.completed ? '✅ Completed' : '⏳ In Progress'}
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Task Title</label>
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-100">
                <p className="text-lg text-gray-800 font-medium">{todo.title}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold text-blue-600 mb-1">Task ID</label>
                <p className="text-xl font-bold text-blue-800">{todo.id}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <label className="block text-sm font-semibold text-purple-600 mb-1">User ID</label>
                <p className="text-xl font-bold text-purple-800">{todo.userId}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                ← Back to List
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                🏠 Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}