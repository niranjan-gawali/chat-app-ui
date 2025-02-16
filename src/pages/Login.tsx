import React, { FormEvent, useEffect, useState } from 'react';
import { LoginDto } from '../dtos/LoginDto';
import { Link, useNavigate } from 'react-router';
import { useGetMe, useLogin } from '../hooks';

const Login = () => {
  const [loginForm, setLoginForm] = useState(new LoginDto());
  const { login, error, setError } = useLogin();
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(loginForm);
      await login(loginForm);
      navigate('/');
      setError(null);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const handleReset = () => {
    console.log(loginForm);
    setLoginForm(new LoginDto());
    setError(null);
  };

  return (
    <div className='px-4 mx-4 mt-[30vh]'>
      <form className='max-w-md mx-auto' onSubmit={handleLogin}>
        {error && (
          <div className='mb-4 text-sm text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md'>
            <span>{error}</span>
          </div>
        )}
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            name='email'
            id='email'
            value={loginForm.email}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Email address
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='password'
            id='password'
            value={loginForm.password}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor='floating_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password
          </label>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'
          >
            Submit
          </button>
          <button
            className='cursor-pointer mx-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className='text-center my-3 underline text-blue-400 hover:text-blue-700 dark:text-white'>
          <Link className='p-2 text-md' to='/signup'>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
