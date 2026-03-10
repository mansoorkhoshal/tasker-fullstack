import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const auth = JSON.parse(localStorage.getItem("auth"));

    if (!auth?.token) {
        return <Navigate to="/welcome" />;
    }

    return children;
};

export default ProtectedRoute;