import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlices";

const Navbar23 = ({ onLoginClick, onSignupClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.user;

    const navLinkClasses =
        "text-gray-600 hover:text-blue-600 transition duration-300";
    const activeLinkClasses = "text-blue-600 font-semibold";

    // const handleLogout = () => {
    //     setUser({ isLoggedIn: false });
    //     setIsProfileOpen(false);
    // };

    const handleLogout = () => {

        localStorage.removeItem("auth");

        window.location.href = "/welcome";
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600">
                TaskManager
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
                {["/", "/favorites", "/work", "/personal", "/learning"].map(
                    (path, i) => (
                        <NavLink
                            key={i}
                            to={path}
                            className={({ isActive }) =>
                                isActive ? activeLinkClasses : navLinkClasses
                            }
                        >
                            {path === "/"
                                ? "All Tasks"
                                : path.replace("/", "").charAt(0).toUpperCase() +
                                path.slice(2)}
                        </NavLink>
                    )
                )}
            </div>

            {/* Right Side (Auth) */}
            <div className="hidden md:flex items-center space-x-4">
                {!user?.isLoggedIn ? (
                    <>
                        <button
                            onClick={onLoginClick}
                            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={onSignupClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
                        >
                            <span className="font-medium text-blue-600">
                                {user.name}
                            </span>
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 z-50">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Profile Details
                                </h3>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Name:</span> {user.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Email:</span> {user.email}
                                </p>
                                {/* <p className="text-sm text-gray-600">
                                    <span className="font-medium">Password:</span>{" "}
                                    {user.password}
                                </p> */}

                                <button
                                    onClick={handleLogout}
                                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-40">
                    <div className="flex flex-col p-4 space-y-4">
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                            All Tasks
                        </NavLink>
                        <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                            Favorite
                        </NavLink>
                        <NavLink to="/work" onClick={() => setIsMenuOpen(false)}>
                            Work
                        </NavLink>
                        <NavLink to="/personal" onClick={() => setIsMenuOpen(false)}>
                            Personal
                        </NavLink>
                        <NavLink to="/learning" onClick={() => setIsMenuOpen(false)}>
                            Learning
                        </NavLink>

                        {!user?.isLoggedIn ? (
                            <>
                                <button onClick={onLoginClick} className="btn-primary">
                                    Login
                                </button>
                                <button onClick={onSignupClick} className="btn-primary">
                                    Signup
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar23;
