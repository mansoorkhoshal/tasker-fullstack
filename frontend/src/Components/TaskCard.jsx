import React from 'react';

const TaskCard = ({ task, onFavoriteToggle, onEdit, onDelete }) => {
    const { title, dueDate, dueTime, status, progress, isFavorite, category, description } = task;
    // const { selectedId, setSelectedId } = useState(null)
    // const { showModel, setShowModel } = useState(false)


    // function openEditModal(id) {
    //     setSelectedId(id);
    // }

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress':
                return 'bg-yellow-200 text-yellow-800';
            case 'Completed':
                return 'bg-green-200 text-green-800';
            default:
                return 'bg-blue-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-blue-100">

            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

                <button
                    onClick={() => onFavoriteToggle(task.id)}
                    className="transition-transform duration-200 hover:scale-110"
                >
                    <svg
                        className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                        fill={isFavorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>

            <p className="text-sm text-gray-500 mt-2">
                Due: {dueDate} at {dueTime}
            </p>

            <p className="text-sm text-gray-600 mt-2">{description}</p>

            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(status)}`}>
                    {status}
                </span>
                <span className="text-sm text-gray-500">{category}</span>
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={() => onEdit(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
