export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/2">
                <button className="float-right" onClick={onClose}>X</button>
                {children}
                <button
                    onClick={() => { setEditingTodo(null); setIsModalOpen(true); }}
                    className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Todo
                </button>

            </div>
        </div>
    );
}
