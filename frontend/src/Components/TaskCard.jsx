import React, { useState } from 'react';
import TaskModal from '../Components/TaskModal';
import EditModal from './EditModal';
import ConfirmModal from './ConfirmModal';

const TaskCard = ({ items, progress }) => {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editId, setEditId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    function handleDelete(id) {
        alert(`delete id is : ${id}`)
        setDeleteId(id);
        setShowModal(true)
    }

    function handleId(id) {
        alert(`id of this card is ${id}`)
        setEditId(id)
        setShowModal(true)
    }
    if (!items) return null;

    const [isFav, setIsFav] = useState(items.isFavourite);

    const handleFavoriteClick = () => {
        setIsFav(prev => !prev);

    };

    const openAddTaskModal = () => {
        setSelectedTask(null);
        setIsTaskModalOpen(true);
    };


    return (
        <div className=''>
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-md 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                        border border-blue-100">

                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {items.title}
                    </h3>

                    <button
                        onClick={handleFavoriteClick}
                        className="transition-transform duration-200 hover:scale-110"
                        aria-label="Toggle Favorite"
                    >
                        <svg
                            className={`w-6 h-6 ${isFav ? 'text-red-500' : 'text-gray-400'}`}
                            fill={isFav ? 'currentColor' : 'none'}
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
                    Due: {items.dueDate} at {items.dueTime}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    {items.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                        {items.statusId?.Name || 'No Status'}
                    </span>

                    <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                        {items.categoryId?.Name || 'No Category'}
                    </span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">

                    <button
                        // onClick={openAddTaskModal}
                        onClick={() => { handleId(items._id) }}
                        className="bg-green-500 text-white px-3 py-1 rounded 
                               hover:bg-green-600 transition-colors"
                    >
                        Edit
                    </button>

                    <button
                        // onClick={handleDelete}
                        onClick={() => { handleDelete(items._id) }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <EditModal
                show={showModal} id={editId} handleClose={() => { setShowModal(false) }}
            />
            <ConfirmModal
                show={showModal} id={deleteId} handleClose={() => { setShowModal(false) }} />
        </div>
    );
};

export default TaskCard;
