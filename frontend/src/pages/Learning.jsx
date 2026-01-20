import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask as apiDeleteTask } from '../services/api';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import ConfirmModal from '../Components/ConfirmModal';
import TaskModal from '../Components/TaskModal';

const Learning = () => {
  const [learningTasks, setLearningTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const tasks = await getTasks();
      setLearningTasks(tasks.filter(task => task.category === 'Learning'));
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleFavoriteToggle = async (taskId) => {
    const task = learningTasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, isFavorite: !task.isFavorite };
      await updateTask(updatedTask);
      setLearningTasks(learningTasks.map(t => t.id === taskId ? updatedTask : t));
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
    setLearningTasks(learningTasks.filter(t => t.id !== taskToDelete));
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSaveTask = async (taskData) => {
    const updated = await updateTask(taskData);
    setLearningTasks(learningTasks.map(t => t.id === updated.id ? updated : t));
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
      <div className='flex justify-between gap-4 sm:flex-row sm:justify-between sm:items-center my-6 mx-4 sm:mx-8 lg:mx-20 border p-4 rounded-2xl shadow-lg border-gray-300 bg-linear-to-br from-blue-50 via-white to-blue-100'>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center sm:text-left">Learning Tasks</h1>
      </div>
      {learningTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
          {learningTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onFavoriteToggle={handleFavoriteToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 items-center flex justify-center mt-17 text-lg">You have no tasks in the learning category.</p>
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

export default Learning;
