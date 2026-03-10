import React from "react";

const Welcome = ({ onLoginClick, onSignupClick }) => {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">

            <h1 className="text-4xl font-bold text-blue-600 mb-4">
                Welcome to TaskManager
            </h1>

            <p className="text-gray-600 mb-8 max-w-xl">
                Organize your tasks, track your progress, and stay productive.
                Login or create an account to start managing your tasks efficiently.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={onLoginClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

                <button
                    onClick={onSignupClick}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white"
                >
                    Signup
                </button>
            </div>

        </div>
    );
};

export default Welcome;