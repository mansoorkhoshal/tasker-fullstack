import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask as apiDeleteTask, addTask, updateTask as apiUpdateTask } from '../services/api';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import TaskModal from '../Components/TaskModal';
import ConfirmModal from '../Components/ConfirmModal';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
            setLoading(false);
        };
        fetchTasks();
    }, []);

    const handleFavoriteToggle = async (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const updatedTask = { ...task, isFavorite: !task.isFavorite };
            await updateTask(updatedTask);
            setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
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
        await apiDeleteTask(taskToDelete);
        setTasks(tasks.filter(t => t.id !== taskToDelete));
        setIsConfirmModalOpen(false);
        setTaskToDelete(null);
    };

    const handleSaveTask = async (taskData) => {
        if (taskData.id) {
            // Update existing task
            const updated = await apiUpdateTask(taskData);
            setTasks(tasks.map(t => t.id === updated.id ? updated : t));
        } else {
            // Add new task
            const newTask = await addTask(taskData);
            setTasks([...tasks, newTask]);
        }
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    const openAddTaskModal = () => {
        setSelectedTask(null);
        setIsTaskModalOpen(true);
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
                <button onClick={openAddTaskModal} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">
                    Add Task
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onFavoriteToggle={handleFavoriteToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
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

export default Home;
