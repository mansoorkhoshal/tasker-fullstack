import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full mt-16" style={{position:"absolute",bottom:"1px"}} >
            <div className="border border-gray-200 bg-linear-to-t from-blue-50 to-white shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4">

                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-blue-600">
                            TaskManager
                        </h2>
                        <p className="text-sm text-gray-500">
                            Organize your work, learning, and life in one place.
                        </p>
                    </div>
                    
                    <div className="text-sm text-gray-500 text-center md:text-right">
                        © {new Date().getFullYear()} TaskManager
                        <br />
                        <span className="text-blue-500 font-medium">
                            Built with MERN
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer
