import React from 'react';

const TaskCard = ({ task, onFavoriteToggle, onEdit, onDelete }) => {
    const { title, dueDate, dueTime, status, progress, isFavorite, category } = task;

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress':
                return 'bg-yellow-200 text-yellow-800';
            case 'Completed':
                return 'bg-green-200 text-green-800';
            case 'Todo':
            default:
                return 'bg-blue-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <button onClick={() => onFavoriteToggle(task.id)} className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                    <svg className={`w-6 h-6 ${isFavorite ? 'text-red-600' : ''}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">{`Due: ${dueDate} at ${dueTime}`}</p>
            <div className="flex items-center justify-between mt-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(status)}`}>
                    {status}
                </span>
                <span className="text-sm text-gray-600">{category}</span>
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-4 space-x-2">
                <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-primary transition-colors duration-300">
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-500 transition-colors duration-300">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
