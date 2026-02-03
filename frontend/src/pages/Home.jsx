import React, { useState, useEffect } from 'react';

import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import TaskModal from '../Components/TaskModal';
import ConfirmModal from '../Components/ConfirmModal';

const Home = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);


    const openAddTaskModal = () => {
        setSelectedTask(null);
        setIsTaskModalOpen(true);
    };
    const [taskStore, setTaskStore] = useState([])


    useEffect(() => {
        fetch('http://localhost:4000/api/task/')
            .then((resposne) => {
                if (resposne.status == 200 || resposne.status == 201) {
                    resposne.json()
                        .then((jsonData) => {
                            console.log(jsonData)
                            setTaskStore(jsonData.data)
                        })
                }
            })
    }, [])

    return (
        <div className="">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between items-center gap-4 my-6 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-5 shadow-md  bg-linear-to-br from-blue-50 via-white to-blue-100">
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

            {
                taskStore && taskStore.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        No tasks found. Start by adding one
                    </div>
                ) : (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-10"
                    >
                        {taskStore.map(task => (
                            <TaskCard
                                key={task._id || task.id}
                                items={task}
                                progress={task.progress || 0}
                            />
                        ))}
                    </div>
                )}

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                // onSave={handleSaveTask}
                // onDelete={handleDelete}
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
