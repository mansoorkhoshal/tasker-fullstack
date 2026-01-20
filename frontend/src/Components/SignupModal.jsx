import React from 'react';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
const SignupModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // function handleForm(data) {
    //     // e.preventDefault()
    //     console.log("form submit", data);
    //     const formData = new FormData();

    //     form.append("fullName", data.fullName);
    //     form.append("email", data.email);
    //     form.append("password", data.password);
    //     form.append("contact", data.contact);
    //     form.append("image", data.image);

    //     reset();
    // }

    async function handleForm(data) {
        console.log("raw form data:", data);

        const formData = new FormData();

        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("contact", data.contact);
        formData.append("image", data.image[0]); // ✅ IMPORTANT

        const res = await fetch('http://localhost:4000/api/user/signup', {
            method: "POST",
            body: formData
        })

        const result= await res.json()

        if (!res.ok) {
          return   toast.error(result)
        }

        toast.success("user created successfully")
        reset();
    }


    return (

        <>
            <ToastContainer>

            </ToastContainer>
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md m-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">Full Name</label>
                            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="text" id="fullName" placeholder="Stackson Development"
                                {...register("fullName", { required: "Name must be entered." })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="email" id="email" placeholder="stackson.dev23@example.com"
                                {...register("email", { required: "Email must be entered." })} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
                            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="password" id="password" placeholder="Enter your password"
                                {...register("password", { required: "Password must be entered." })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contact">Contact</label>
                            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="text" id="contact" placeholder="+92-3337677344"
                                {...register("contact", { required: "Contact Info must be entered." })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">Profile Image</label>
                            <input className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-600 hover:file:bg-blue-300" type="file" id="image"
                                {...register("image", { required: "Image is necessary for SignUp." })}
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 font-semibold" type="submit">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default SignupModal;
