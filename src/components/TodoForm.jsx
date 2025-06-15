import { useState, useEffect } from 'react';

export default function TodoForm({ initialData = {}, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCompleted(initialData.completed || false);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ ...initialData, title: title.trim(), completed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📝 Task Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          required
        />
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
        />
        <label htmlFor="completed" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className={completed ? 'text-green-600' : 'text-gray-500'}>
            {completed ? '✅' : '⏳'}
          </span>
          Mark as completed
        </label>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          💾 Save Todo
        </button>
        <button 
          type="button"
          onClick={onClose}
          className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}