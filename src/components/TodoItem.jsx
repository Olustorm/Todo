export default function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <li className="flex justify-between items-center border p-3 rounded hover:shadow">
      <div>
        <Link to={`/todos/${todo.id}`} className="font-medium hover:underline">
          {todo.title}
        </Link>
        <div className={`text-sm ${todo.completed ? 'text-green-600' : 'text-red-600'}`}>
          {todo.completed ? 'Completed' : 'Incomplete'}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(todo)} className="text-blue-500">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500">Delete</button>
      </div>
    </li>
  );
}
