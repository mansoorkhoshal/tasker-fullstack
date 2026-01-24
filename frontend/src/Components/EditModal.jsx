import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const EditModal = ({ id, show, handleClose }) => {

    const { register, handleSubmit, watch, reset } = useForm();
    const [categoryFetchData, setcategoryFetchData] = useState([]);
    const [activeTab, setActiveTab] = useState('basic');
    const [fecthData, setFecthData] = useState([]);

    const progressValue = watch('progress');


    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/status')
                .then((response) => {

                    if (response.status == 200) {
                        response.json()
                            .then((jsonData) => {
                                setFecthData(jsonData)
                            })
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }, [])


    useEffect(() => {
        try {
            fetch("http://localhost:4000/api/category")
                .then((categoryResponse) => {
                    if (categoryResponse.status == 200) {
                        categoryResponse.json()
                            .then((categoryJsonData) => {
                                setcategoryFetchData(categoryJsonData)
                            })
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }, []);

    const formatDateForInput = (dateStr) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
    };

    const formatTimeForInput = (timeStr) => {
        if (!timeStr) return '';

        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = String(Number(hours) + 12);
        }
        if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    };


    useEffect(() => {
        try {

            if (show && id) {
                fetch(`http://localhost:4000/api/task/${id}`)
                    .then((response) => {
                        if (response.status == 200 || response.status == 201) {
                            response.json()
                                .then((jsonData) => {
                                    console.log(jsonData)
                                    reset({
                                        title: jsonData.title,
                                        description: jsonData.description,
                                        isFavourite: jsonData.isFavourite,
                                        dueDate: formatDateForInput(jsonData.dueDate?.split("T")[0]),
                                        dueTime: formatTimeForInput(jsonData.dueTime),
                                        progress: jsonData.progress,
                                        categoryId: jsonData.categoryId?._id,
                                        statusId: jsonData.statusId?._id,
                                        priorityId: jsonData.priorityId,
                                    });
                                })
                        }
                    }).catch((err) => { console.log(err) })
            }

        } catch (err) {
            res.status(400).json(err.message)
        }
    }, [show, id])

    const onSubmit = (data) => {
        console.log('FORM DATA:', data);
        fetch(`http://localhost:4000/api/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 201 || response.status == 200) {
                alert("task update successfuly")
                window.location.reload(),
                    handleClose();
                reset()
            }
        })

    };

    if (!show) return null;


    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Edit Task {id}</h2>
                    <button onClick={handleClose}>✕</button>
                </div>

                <div className="border-b mb-6">
                    <nav className="flex space-x-6">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`py-2 border-b-2 ${activeTab === 'basic'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500'
                                }`}
                        >
                            Basic
                        </button>
                        <button
                            onClick={() => setActiveTab('more')}
                            className={`py-2 border-b-2 ${activeTab === 'more'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500'
                                }`}
                        >
                            More
                        </button>
                    </nav>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {activeTab === 'basic' && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Title</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg"
                                    {...register('title', { required: true })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2 font-semibold">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        {...register('dueDate', { required: true })}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Due Time</label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        {...register('dueTime', { required: true })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2 font-semibold">Category</label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg"
                                        {...register('categoryId')}
                                    >
                                        {
                                            (categoryFetchData && categoryFetchData.length > 0) ?
                                                categoryFetchData.map((i) => (
                                                    <option key={i._id} value={i._id}>{i.Name}</option>
                                                ))
                                                : "No Category Avaliable"
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Status</label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg"
                                        {...register('statusId')}
                                    >
                                        {
                                            (fecthData && fecthData.length > 0) ?
                                                fecthData.map((i) => (
                                                    <option key={i._id} value={i._id} className=''>{i.Name}</option>
                                                ))

                                                : "No Status Avaliable"
                                        }
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'more' && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Progress ({progressValue}%)
                                </label>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                                    {...register('progress')}
                                >
                                    <option value={0}>0% you didn't start yet</option>
                                    <option value={25}>25% you just started working on it</option>
                                    <option value={50}>50% you're halfway through the task</option>
                                    <option value={75}>75% almost done, just a little left</option>
                                    <option value={100}>100% task completed successfully</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Description</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    {...register('description')}
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditModal;
