import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import Logo from "../../assets/main.webp"; // Ensure the path is correct

// Validation schema


function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values, "Admin:", isAdmin);
    },
  });

  return (
    <div className="w-full h-screen flex rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto rounded-md h-[550px] sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full rounded-l-md" src={Logo} alt="Logo" />
        </div>

        <div className="flex items-center rounded-md justify-center bg-gray-100">
          <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl mb-6 text-center">Login</h2>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border rounded ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                className={`w-full p-2 border rounded ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
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
              <label htmlFor="role" className="text-sm">Login as Admin</label>
            </div>

            <button type="submit" className="w-full mb-2 bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
              Login
            </button>
            <Link to="/register">
              <p className="text-orange-500 text-center">Don't have an account? Register</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
