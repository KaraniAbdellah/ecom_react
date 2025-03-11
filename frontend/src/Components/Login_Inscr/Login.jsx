import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/main.webp"; // Ensure the path is correct
import axios from "axios";
import Cookies from "js-cookie";

// Validation schema
function Login() {
  const navigate = useNavigate();
  const [isExit, setIsExit] = useState(true);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("isAdmin", isAdmin);
      axios
        .post("http://127.0.0.1:5000/user/CheckUser", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.isExit) {
            localStorage.setItem("userId", res.data.userId);
            navigate("/");
          } else {
            setIsExit(false);
          }
        });

      // Give A User A Token
      if (Cookies.get("tokenAuth")) {
        console.log("Hello");
      }
      axios.get("http://127.0.0.1:5000/user/GenerateToken").then((res) => {
        Cookies.set("tokenAuth", res.data.token);
      });
    },
  });

  return (
    <div className="w-full h-screen flex rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto rounded-md h-[550px] sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full rounded-l-md" src={Logo} alt="Logo" />
        </div>

        <div
          className="flex items-center md:rounded-r-md justify-center bg-white broder border-r-orange-600
          border-2
          md:border-b-orange-600 md:border-t-orange-600
          sm:border-orange-600
          border-orange-600
          "
        >
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-100 p-8 md:rounded-lg rounded-sm w-96"
          >
            <h2 className="text-2xl mb-3 text-center">Login</h2>
            <div
              className={`message text-center text-red-700 ${
                isExit ? "hidden" : "block"
              }`}
            >
              Email or Password Inccorect
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border rounded ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-2 border rounded ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="role"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="mr-2"
              />
              <label htmlFor="role" className="text-sm">
                Login as Admin
              </label>
            </div>

            <button
              type="submit"
              className="w-full mb-2 bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
              Login
            </button>
            <Link to="/register">
              <p className="text-orange-500 text-center">
                Don't have an account? Register
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
