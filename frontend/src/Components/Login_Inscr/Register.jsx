import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import Logo from "../../assets/main.webp";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div className="w-full flex mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px]  sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full rounded-l-md" src={Logo} alt="Logo" />
        </div>
        <div className=" flex rounded-r-md items-center justify-center bg-gray-100">
          <form onSubmit={formik.handleSubmit} className="bg-white px-5 py-4 rounded-lg  w-96 space-y-4">
            <h2 className="text-2xl mb-2 text-center font-semibold">Registration</h2>
            <div className="mb-1">
              <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className={`w-full p-2 border rounded ${
                  formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
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

            <div className="mb-1">
              <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
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

            <div className="mb-1">
              <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full p-2 border rounded ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none">
              Register
            </button>
            <Link to="/login">
              <p className="text-orange-500 text-center mt-4">
                Already have an account?
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
