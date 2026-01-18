import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask as apiDeleteTask } from '../services/api';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import ConfirmModal from '../Components/ConfirmModal';
import TaskModal from '../Components/TaskModal';

const Work = () => {
  const [workTasks, setWorkTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const tasks = await getTasks();
      setWorkTasks(tasks.filter(task => task.category === 'Work'));
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleFavoriteToggle = async (taskId) => {
    const task = workTasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, isFavorite: !task.isFavorite };
      await updateTask(updatedTask);
      setWorkTasks(workTasks.map(t => t.id === taskId ? updatedTask : t));
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
    setWorkTasks(workTasks.filter(t => t.id !== taskToDelete));
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSaveTask = async (taskData) => {
    const updated = await updateTask(taskData);
    setWorkTasks(workTasks.map(t => t.id === updated.id ? updated : t));
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Work Tasks</h1>
      {workTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workTasks.map(task => (
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
        <p className="text-gray-500">You have no tasks in the work category.</p>
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

export default Work;
