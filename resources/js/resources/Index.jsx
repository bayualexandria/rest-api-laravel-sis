import React from "react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./src/pages/auth/Login";
import Home from "./src/pages/Home";
import Register from "./src/pages/auth/Register";
import Profile from "./src/pages/profile/Profile";
import Guru from "./src/pages/guru/Guru";
import Siswa from "./src/pages/siswa/Siswa";
import GetById from "./src/pages/siswa/GetById";
import UpdateDataGuru from "./src/pages/guru/UpdateDataGuru";

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Start UnAuthorization */}
                <Route
                    path="/login"
                    element={
                        <UnAthenticated>
                            <Login />
                        </UnAthenticated>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <UnAthenticated>
                            <Register />
                        </UnAthenticated>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/guru"
                    element={
                        <PrivateRoute>
                            <Guru />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/guru/:nip"
                    element={
                        <PrivateRoute>
                            <UpdateDataGuru />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/siswa"
                    element={
                        <PrivateRoute>
                            <Siswa />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/siswa/:nis"
                    element={
                        <PrivateRoute>
                            <GetById />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

function PrivateRoute({ children }) {
    const cookieAuth = Cookies.get("authentication");

    if (cookieAuth) {
        return children;
    }
    return <Navigate to="/login" replace={true} />;
}

function UnAthenticated({ children }) {
    const cookieAuth = Cookies.get("authentication");
    if (!cookieAuth) {
        return children;
    }
    return <Navigate to="/" replace={true} />;
}

if (document.getElementById("root")) {
    ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
}
