import { Link } from 'react-router-dom';

export default function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <li className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
      <div className="flex justify-between items-center p-6">
        <div className="flex-1">
          <Link 
            to={`/todos/${todo.id}`} 
            className="block group-hover:transform group-hover:translate-x-2 transition-transform duration-200"
          >
            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2 text-lg">
              {todo.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                todo.completed 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-orange-100 text-orange-800 border border-orange-200'
              }`}>
                {todo.completed ? '✅ Completed' : '⏳ In Progress'}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                ID: {todo.id}
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => onEdit(todo)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1"
          >
            <span>✏️</span>
            Edit
          </button>
          <button 
            onClick={() => onDelete(todo.id)}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1"
          >
            <span>🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}