import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isAdmin
      ? "http://localhost:3000/api/auth/login/admin"
      : "http://localhost:3000/api/auth/login/user";

    const payload = isAdmin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${isAdmin ? "Admin" : "User"} login successful!`);
        localStorage.setItem("token", data.token);
        navigate(isAdmin ? "/admin" : "/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  const toggleLoginType = () => {
    setIsAdmin((prev) => !prev);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        <div className="flex justify-center items-center gap-3 mb-6">
          <span className={!isAdmin ? "font-semibold text-blue-600" : "text-gray-500"}>
            User
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAdmin}
              onChange={toggleLoginType}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className={isAdmin ? "font-semibold text-blue-600" : "text-gray-500"}>
            Admin
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdmin ? (
            <>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {isAdmin && (
            <p className="text-xs text-red-500 mt-1">
              Admin access is restricted to authorized personnel only.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login as {isAdmin ? "Admin" : "User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
