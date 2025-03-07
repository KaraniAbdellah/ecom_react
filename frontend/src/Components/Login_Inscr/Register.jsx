import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router';
import Logo from '../../assets/main.jpg';

// Validation schema for registration
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Weak password'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirmation is required'),
});

function Register() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        // API call if validation succeeds
        await axios.post('http://your-api/register', {
          name: values.name,
          email: values.email,
          password: values.password,
          role: 'user',
        });

        // Redirect to login
        window.location.href = '/login';
      } catch (error) {
        console.error('Registration error:', error);
        // Handle registration errors here (e.g., set a state for errors)
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
            <h2 className='text-2xl mb-6 text-center'>Registration</h2>

            <div className='mb-4'>
              <label htmlFor='name' className='block mb-2'>Name</label>
              <input
                type='text'
                id='name'
                {...formik.getFieldProps('name')}
                className={`w-full p-2 border rounded ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className='text-red-500 text-sm mt-1'>{formik.errors.name}</p>
              )}
            </div>

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

            <div className='mb-4'>
              <label htmlFor='confirmPassword' className='block mb-2'>Confirm Password</label>
              <input
                type='password'
                id='confirmPassword'
                {...formik.getFieldProps('confirmPassword')}
                className={`w-full p-2 border rounded ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button type='submit' className='w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600'>
              Register
            </button>
            <Link to='/login'>
              <p className='text-orange-500 text-center'>
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