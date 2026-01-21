import React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
// import { ToastProps } from './../../node_modules/react-bootstrap/cjs/Toast.d';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  async function handleForm(data) {
    console.log("raw form data:", data);

    try {
      // const payload = {
      //   email: data.email,
      //   password: data.password
      // }
      // const res = await fetch("http://localhost:4000/api/users/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: data.email,
      //     password: data.password,
      //   }),
      // });


      // const result = await res.json();

      // if (!res.ok) {
      //   return toast.error(result.message)
      // }

      // toast.success("User login successfully")

      // const res = await fetch("http://localhost:4000/api/users/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: data.email,
      //     password: data.password,
      //   }),
      // });

      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message || "Login failed");
      }

      toast.success("User login successfully");




    } catch (error) {
      toast.error(error.message || "Some thing went wrong")


    }
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm m-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="login-email">Email</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="email" id="login-email" placeholder="stackson.dev23@example.com"
                {...register("email", { required: "Please enter an email!" })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="login-password">Password</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="password" id="login-password" placeholder="Enter your password"
                {...register('password', { required: "Please enter password!" })}
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 font-semibold" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
