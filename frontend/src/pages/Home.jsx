import React, { useState, useEffect } from 'react';

import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import TaskModal from '../Components/TaskModal';
import ConfirmModal from '../Components/ConfirmModal';

const Home = () => {
    // const [loading, setLoading] = useState(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    // const [taskToDelete, setTaskToDelete] = useState(null);

    // const confirmDelete = async () => {
    //     await apiDeleteTask(taskToDelete);
    //     setTasks(tasks.filter(t => t.id !== taskToDelete && t._id !== taskToDelete));
    //     setIsConfirmModalOpen(false);
    //     setTaskToDelete(null);
    // };

    // const handleSaveTask = async (taskData) => {
    //     if (taskData.id || taskData._id) {
    //         const updated = await apiUpdateTask(taskData);
    //         setTasks(tasks.map(t =>
    //             t.id === updated.id || t._id === updated._id ? updated : t
    //         ));
    //     } else {
    //         const newTask = await addTask(taskData);
    //         setTasks(prev => [...prev, newTask]);
    //     }
    //     setIsTaskModalOpen(false);
    //     setSelectedTask(null);
    // };

    const openAddTaskModal = () => {
        setSelectedTask(null);
        setIsTaskModalOpen(true);
    };

    // if (loading) return <Loader />;

    return (
        <div className="">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between items-center gap-4 my-6
                                bg-white/80 backdrop-blur-md border border-blue-100
                                rounded-2xl p-5 shadow-md  bg-linear-to-br from-blue-50 via-white to-blue-100">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                        All Tasks
                    </h1>
                    <button
                        onClick={openAddTaskModal}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                    >
                        + Add Task
                    </button>
                </div>
            </div>

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                // onSave={handleSaveTask}
                task={selectedTask}
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                // onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this task?"
            />
        </div>
    );
};

export default Home;
