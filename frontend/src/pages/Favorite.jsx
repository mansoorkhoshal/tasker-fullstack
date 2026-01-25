import React, { useState, useEffect } from 'react';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import ConfirmModal from '../Components/ConfirmModal';
import TaskModal from '../Components/TaskModal';

const Favorite = () => {
    const [favoriteTasks, setFavoriteTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchFavoriteTasks = async () => {
            try {
                setLoading(true);

                const res = await fetch('http://localhost:4000/api/task/favourite');
                const json = await res.json();

                // setFavoriteTasks(json.data);
                setFavoriteTasks(Array.isArray(json.data) ? json.data : []);

            } catch (error) {
                console.error('Failed to fetch favorites', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteTasks();
    }, []);



    const handleFavoriteToggle = async (task) => {
        try {
            await fetch(`http://localhost:4000/api/task/favourite/${task._id}`, {
                method: 'PUT',
            });

            setFavoriteTasks(prev =>
                prev.filter(t => t._id !== task._id)
            );

        } catch (error) {
            console.error('Failed to toggle favorite', error);
        }
    };



    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const handleDelete = (taskId) => {
        setTaskToDelete(taskId);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        await fetch(`http://localhost:4000/api/task/${taskToDelete}`, {
            method: 'DELETE',
        });

        setFavoriteTasks(prev =>
            prev.filter(t => t._id !== taskToDelete)
        );

        setIsConfirmModalOpen(false);
        setTaskToDelete(null);
    };


    const handleSaveTask = async (taskData) => {
        const updated = await updateTask(taskData);

        setFavoriteTasks(prev =>
            prev.map(t => t._id === updated._id ? updated : t)
        );

        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    if (loading) return <Loader />;

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="flex justify-between items-center gap-4 my-6 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-5 shadow-md  bg-linear-to-br from-blue-50 via-white to-blue-100">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                    Favorite Tasks
                </h1>
            </div>

            {favoriteTasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {favoriteTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            items={task}
                            progress={task.progress}
                            onFavoriteToggle={() => handleFavoriteToggle(task)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No favorite tasks yet
                </p>
            )}

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSave={handleSaveTask}
                task={selectedTask}
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this task?"
            />
        </div>
    );
};

export default Favorite;
