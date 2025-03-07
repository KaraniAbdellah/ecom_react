import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router';
import Logo from '../../assets/main.jpg'; // Ensure the path is correct

// Validation schema for login
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const [isAdmin, setIsAdmin] = useState(false); // State to manage user role

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        // API call for login
        const response = await axios.post('http://your-api/login', {
          email: values.email,
          password: values.password,
          role: isAdmin ? 'admin' : 'user', // Include role in the request
        });

        // Handle successful authentication
        console.log('Login successful:', response.data);
        // Redirect or store token as needed

      } catch (error) {
        console.error('Login error:', error);
        // Handle login errors here (e.g., set a state for errors)
      }
    },
  });

  return (
    <div className='w-full h-screen flex'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className='w-full h-[550px] hidden md:block'>
          <img className='w-full h-full' src={Logo} alt='Logo' />
        </div>

        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
          <form onSubmit={formik.handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-96'>
            <h2 className='text-2xl mb-6 text-center'>Login</h2>

            <div className='mb-4'>
              <label htmlFor='email' className='block mb-2'>Email</label>
              <input
                type='email'
                id='email'
                {...formik.getFieldProps('email')}
                className={`w-full p-2 border rounded ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-500 text-sm mt-1'>{formik.errors.email}</p>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block mb-2'>Password</label>
              <input
                type='password'
                id='password'
                {...formik.getFieldProps('password')}
                className={`w-full p-2 border rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className='text-red-500 text-sm mt-1'>{formik.errors.password}</p>
              )}
            </div>

            <div className='mb-4 flex items-center'>
              <input
                type='checkbox'
                id='role'
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className='mr-2'
              />
              <label htmlFor='role' className='text-sm'>Login as Admin</label>
            </div>

            <button type='submit' className='w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600'>
              Login
            </button>
            <Link to='/register'>
              <p className='text-orange-500 text-center'>
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