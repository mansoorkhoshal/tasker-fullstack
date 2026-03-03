import React, { useEffect, useState } from 'react';
import TaskCard from '../Components/TaskCard';
import Loader from '../Components/Loader';

const Work = () => {
  const [workTasks, setWorkTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/api/task');
        const json = await res.json();

        const onlyWork = Array.isArray(json.data)
          ? json.data.filter(
              (task) => task.categoryId?.Name?.toLowerCase() === 'work'
            )
          : [];

        setWorkTasks(onlyWork);
      } catch (error) {
        console.error('Failed to fetch work tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkTasks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center gap-4 my-6 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-5 shadow-md bg-linear-to-br from-blue-50 via-white to-blue-100'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-700'>Work Tasks</h1>
      </div>

      {workTasks.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {workTasks.map((task) => (
            <TaskCard key={task._id} items={task} progress={task.progress} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 text-lg mt-10'>
          No Work tasks yet
        </p>
      )}
    </div>
  );
};

export default Work;
