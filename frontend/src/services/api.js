// dummy data
// const tasks = [
//   {
//     id: 1,
//     title: 'Design new PakClassified',
//     dueDate: '2026-01-20',
//     dueTime: '14:00',
//     category: 'Work',
//     status: 'In Progress',
//     progress: 50,
//     description: 'Design a new dashboard for the main application, focusing on user experience and a clean interface.',
//     isFavorite: true,
//   },
//   {
//     id: 2,
//     title: 'Develop API for tasker project',
//     dueDate: '2026-01-25',
//     dueTime: '18:00',
//     category: 'Work',
//     status: 'Todo',
//     progress: 0,
//     description: 'Develop a RESTful API for managing tasks, including CRUD operations.',
//     isFavorite: false,
//   },
//   {
//     id: 3,
//     title: 'Learn new React features',
//     dueDate: '2026-01-22',
//     dueTime: '10:00',
//     category: 'Learning',
//     status: 'Completed',
//     progress: 100,
//     description: 'Explore and implement new features from the latest React version.',
//     isFavorite: true,
//   },
//   {
//     id: 4,
//     title: 'Go for a GYM',
//     dueDate: '2026-01-18',
//     dueTime: '07:00',
//     category: 'Personal',
//     status: 'Todo',
//     progress: 0,
//     description: 'A 1 hour GYM in the park side gym.',
//     isFavorite: false,
//   },
// ];

// export const getTasks = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(tasks);
//     }, 1000);
//   });
// };

// export const getTask = async (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(tasks.find(task => task.id === id));
//     }, 500);
//   });
// };

// export const addTask = async (task) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newTask = { ...task, id: Date.now() };
//       tasks.push(newTask);
//       resolve(newTask);
//     }, 500);
//   });
// };

// export const updateTask = async (updatedTask) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const index = tasks.findIndex(task => task.id === updatedTask.id);
//       if (index !== -1) {
//         tasks[index] = updatedTask;
//         resolve(updatedTask);
//       }
//     }, 500);
//   });
// };

// export const deleteTask = async (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const index = tasks.findIndex(task => task.id === id);
//       if (index !== -1) {
//         tasks.splice(index, 1);
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     }, 500);
//   });
// };
