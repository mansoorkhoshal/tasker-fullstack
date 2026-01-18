import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    category: 'Work',
    status: 'Todo',
    progress: 0,
    description: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        dueDate: task.dueDate || '',
        dueTime: task.dueTime || '',
        category: task.category || 'Work',
        status: task.status || 'Todo',
        progress: task.progress || 0,
        description: task.description || '',
      });
    } else {
      setFormData({
        title: '',
        dueDate: '',
        dueTime: '',
        category: 'Work',
        status: 'Todo',
        progress: 0,
        description: '',
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: task ? task.id : undefined });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{task ? 'Edit Task' : 'Add Task'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            <button onClick={() => setActiveTab('basic')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Basic
            </button>
            <button onClick={() => setActiveTab('more')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'more' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              More
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'basic' && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dueDate">Due Date</label>
                  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dueTime">Due Time</label>
                  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="time" name="dueTime" id="dueTime" value={formData.dueTime} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">Category</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white" name="category" id="category" value={formData.category} onChange={handleChange}>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Learning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="status">Status</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white" name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option>Todo</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'more' && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="progress">Progress ({formData.progress}%)</label>
                <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" type="range" name="progress" id="progress" min="0" max="100" value={formData.progress} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Description</label>
                <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" name="description" id="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors">{task ? 'Save Changes' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
