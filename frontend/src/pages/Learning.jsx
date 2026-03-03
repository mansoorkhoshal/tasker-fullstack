// import React, { useState, useEffect } from 'react';
// // import { getTasks, updateTask, deleteTask as apiDeleteTask } from '../services/api';
// import TaskCard from '../Components/TaskCard';
// import Loader from '../Components/Loader';
// import ConfirmModal from '../Components/ConfirmModal';
// import TaskModal from '../Components/TaskModal';

// const Learning = () => {
//   const [learningTasks, setLearningTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       const tasks = await getTasks();
//       setLearningTasks(tasks.filter(task => task.category === 'Learning'));
//       setLoading(false);
//     };
//     fetchTasks();
//   }, []);

//   const handleFavoriteToggle = async (taskId) => {
//     const task = learningTasks.find(t => t.id === taskId);
//     if (task) {
//       const updatedTask = { ...task, isFavorite: !task.isFavorite };
//       await updateTask(updatedTask);
//       setLearningTasks(learningTasks.map(t => t.id === taskId ? updatedTask : t));
//     }
//   };

//   const handleEdit = (task) => {
//     setSelectedTask(task);
//     setIsTaskModalOpen(true);
//   };

//   const handleDelete = (taskId) => {
//     setTaskToDelete(taskId);
//     setIsConfirmModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     await apiDeleteTask(taskToDelete);
//     setLearningTasks(learningTasks.filter(t => t.id !== taskToDelete));
//     setIsConfirmModalOpen(false);
//     setTaskToDelete(null);
//   };

//   const handleSaveTask = async (taskData) => {
//     const updated = await updateTask(taskData);
//     setLearningTasks(learningTasks.map(t => t.id === updated.id ? updated : t));
//     setIsTaskModalOpen(false);
//     setSelectedTask(null);
//   };

//   const openAddTaskModal = () => {
//     setSelectedTask(null);
//     setIsTaskModalOpen(true);
//   }


//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <div className='flex justify-between gap-4 sm:flex-row sm:justify-between sm:items-center my-6 mx-4 sm:mx-8 lg:mx-20 border p-4 rounded-2xl shadow-lg border-gray-300 bg-linear-to-br from-blue-50 via-white to-blue-100'>
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center sm:text-left">Learning Tasks</h1>
//       </div>
//       {learningTasks.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
//           {learningTasks.map(task => (
//             <TaskCard
//               key={task.id}
//               task={task}
//               onFavoriteToggle={handleFavoriteToggle}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 items-center flex justify-center mt-17 text-lg">You have no tasks in the learning category.</p>
//       )}
//       <TaskModal
//         isOpen={isTaskModalOpen}
//         onClose={() => setIsTaskModalOpen(false)}
//         onSave={handleSaveTask}
//         task={selectedTask}
//       />
//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={confirmDelete}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this task?"
//       />
//     </div>
//   );
// };

// export default Learning;

import React, { useState, useEffect } from 'react';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';
import ConfirmModal from '../Components/ConfirmModal';

const Learning = () => {
  const [learningTasks, setLearningTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // ✅ SAME BACKEND METHOD AS FAVORITE PAGE
  useEffect(() => {
    const fetchLearningTasks = async () => {
      try {
        setLoading(true);

        const res = await fetch('http://localhost:4000/api/task');
        const json = await res.json();

        const onlyLearning = Array.isArray(json.data)
          ? json.data.filter(task => task.category === "Learning")
          : [];

        setLearningTasks(onlyLearning);

      } catch (error) {
        console.error('Failed to fetch learning tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningTasks();
  }, []);

  // ✅ SAME FAVORITE TOGGLE AS FAVORITE PAGE
  const handleFavoriteToggle = async (task) => {
    try {
      await fetch('http://localhost:4000/api/task/favourite', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: task._id }),
      });

      setLearningTasks(prev =>
        prev.map(t =>
          t._id === task._id
            ? { ...t, isFavourite: !t.isFavourite }
            : t
        )
      );

    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  // ✅ SAME DELETE STYLE AS FAVORITE PAGE
  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:4000/api/task/${taskToDelete}`, {
        method: 'DELETE',
      });

      setLearningTasks(prev =>
        prev.filter(t => t._id !== taskToDelete)
      );

    } catch (error) {
      console.error('Delete failed', error);
    }

    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  if (loading) return <Loader />;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className="flex justify-between items-center gap-4 my-6 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-5 shadow-md bg-linear-to-br from-blue-50 via-white to-blue-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
          Learning Tasks
        </h1>
      </div>

      {/* {learningTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {learningTasks.map(task => (
            <TaskCard
              key={task._id}
              items={task}
              progress={task.progress}
              onFavoriteToggle={() => handleFavoriteToggle(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No Learning tasks yet
        </p>
      )} */}

      {learningTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {learningTasks.map(task => (
            <TaskCard
              key={task._id}
              items={task}
              progress={task.progress}
              onFavoriteToggle={() => handleFavoriteToggle(task)}
              onEdit={handleEdit}
              onDelete={() => handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No Learning tasks yet
        </p>
      )}

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