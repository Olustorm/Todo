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
    
    onSave({ 
      ...initialData, 
      title: title.trim(), 
      completed,
      userId: initialData.userId || 1 // Default userId for new todos
    });
    onClose();
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          initialData.id ? 'bg-blue-100' : 'bg-green-100'
        }`}>
          <svg className={`w-4 h-4 ${
            initialData.id ? 'text-blue-600' : 'text-green-600'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {initialData.id ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            )}
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {initialData.id ? 'Edit Todo' : 'Create New Todo'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Todo Title
          </label>
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
            autoFocus
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="completed" className="ml-3 text-sm text-gray-700">
            Mark as completed
          </label>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            className="btn-success flex-1 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{initialData.id ? 'Update Todo' : 'Create Todo'}</span>
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}