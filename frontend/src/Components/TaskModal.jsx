import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const TaskModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [statusData, setStatusData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "",
      dueDate: "",
      dueTime: "",
      categoryId: "",
      statusId: "",
      progress: 0,
      description: "",
    },
  });

  const progressValue = watch("progress");
  const user = useSelector(state => state.user.user)
  // Fetch Status
  useEffect(() => {
    fetch("http://localhost:4000/api/status")
      .then((res) => res.json())
      .then((data) => {
        setStatusData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Fetch Category
  useEffect(() => {
    fetch("http://localhost:4000/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    if (!user || !user._id) {
      alert("Login required")
      return;
    }
    const payload = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
      progress: data.progress,
      categoryId: data.categoryId,
      statusId: data.statusId,
      createdBy: user._id,
      priorityId: '695fac0e21abdfbdbc5853d6'
    };

    try {
      const response = await fetch("http://localhost:4000/api/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Task Created Successfully");
        onClose();
        window.location.reload(); // reload task list
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Task</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-2xl hover:text-red-700"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-6">
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className={`py-2 border-b-2 ${activeTab === "basic"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
                }`}
            >
              Basic
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("more")}
              className={`py-2 border-b-2 ${activeTab === "more"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
                }`}
            >
              More
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === "basic" && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Title</label>
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-semibold">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg"
                    {...register("dueDate", { required: true })}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Due Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border rounded-lg"
                    {...register("dueTime", { required: true })}
                  />
                </div>
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-semibold">Category</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    {...register("categoryId")}
                  >
                    <option value="">Select Category</option>
                    {categoryData.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Status</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    {...register("statusId")}
                  >
                    <option value="">Select Status</option>
                    {statusData.map((st) => (
                      <option key={st._id} value={st._id}>
                        {st.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "more" && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Progress ({progressValue}%)
                </label>

                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  {...register("progress")}
                >
                  <option value={0}>0% you didn't start yet</option>
                  <option value={25}>25% you just started</option>
                  <option value={50}>50% halfway done</option>
                  <option value={75}>75% almost done</option>
                  <option value={100}>100% completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg"
                  {...register("description")}
                />
              </div>
            </>
          )}

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;