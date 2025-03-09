import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/main.webp";
import axios from "axios";
import Cookies from "js-cookie";


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
  const [isExitEmail, setisExitEmail] = useState(true);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      axios.post("http://127.0.0.1:5000/user/CheckEmail", {email: values.email}).then((res) => {
        console.log(res.data.isExit);
        if (res.data.isExit) {
          setisExitEmail(false);
        } else {
          console.log(values);
          axios
            .post("http://127.0.0.1:5000/user/AddUser", {
              email: values.email,
              password: values.password,
              name: values.name,
            })
            .then((res) => {
              Cookies.set('tokenAuth', res.data.token);
              localStorage.setItem("userId", res.data.userId);
              navigate("/login");
            });
        }
      });
    },
  });

  return (
    <div className="w-full flex mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px]  sm:max-w-[900px]">
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
          <form onSubmit={formik.handleSubmit} className="bg-gray-100 px-5 py-4 rounded-md  w-96 space-y-4">
            <h2 className="text-2xl mb-2 text-center font-semibold">Registration</h2>
            <div className={`message text-center text-red-700 ${isExitEmail ? "hidden" : "block"}`} >Email Already Exit</div>
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
