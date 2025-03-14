import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState(""); // Add state for message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await axios.put(`http://127.0.0.1:5000/user/update/${userId}`, {
          name: name,
          email: email,
          password: password,
        });
        setMessage("Profile updated successfully!"); // Success message
      } catch (error) {
        setMessage("Error updating profile. Please try again."); // Error message
        console.error("Update error:", error);
      }
    } else {
      setMessage("Please fill in all fields."); // Validation message
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    } else {
      setMessage("User ID not found. Please log in again.");
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/user/getUserByUserId/${id}`
      );
      if (res.data && res.data.length > 0) {
        const userInfo = res.data[0];
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPassword(userInfo.password);
      } else {
        setMessage("No user data found.");
      }
    } catch (error) {
      setMessage("Error fetching user data.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-md p-6 rounded-lg bg-white shadow w-[500px]">
        <Link to="/">
          <button
            className="text-gray-600 hover:text-orange-500 hover:bg-gray-200 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Edit Profile
        </h2>

        {/* Display message if exists */}
        {message && (
          <div className="mb-4 p-3 bg-orange-100 text-red-800 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mb-3 bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition duration-300"
          >
            Save Changes
          </button>
          <Link to="/">
            <button
              type="button"
              className="w-full bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition duration-300"
            >
              Go To Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Profile;
