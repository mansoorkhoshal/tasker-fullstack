import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onSignupClick, onLoginClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "text-gray-600 hover:text-blue-600 transition duration-300";
    const activeLinkClasses = "text-blue-600 font-semibold";

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">TaskManager</div>
            <div className="hidden md:flex items-center space-x-6">
                <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses}>All Tasks</NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses}>Favorite</NavLink>
                <NavLink to="/work" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses}>Work</NavLink>
                <NavLink to="/personal" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses}>Personal</NavLink>
                <NavLink to="/learning" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses}>Learning</NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <button onClick={onLoginClick} className="text-gray-600 hover:text-blue-600 transition duration-300">Login</button>
                <button onClick={onSignupClick} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Signup</button>
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses} onClick={() => setIsMenuOpen(false)}>All Tasks</NavLink>
                        <NavLink to="/favorites" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses} onClick={() => setIsMenuOpen(false)}>Favorite</NavLink>
                        <NavLink to="/work" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses} onClick={() => setIsMenuOpen(false)}>Work</NavLink>
                        <NavLink to="/personal" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses} onClick={() => setIsMenuOpen(false)}>Personal</NavLink>
                        <NavLink to="/learning" className={({ isActive }) => isActive ? activeLinkClasses : navLinkClasses} onClick={() => setIsMenuOpen(false)}>Learning</NavLink>
                        <div className="flex flex-col space-y-4">
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="text-gray-600 hover:text-blue-600 transition duration-300 text-left">Login</button>
                            <button onClick={() => { onSignupClick(); setIsMenuOpen(false); }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Signup</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
