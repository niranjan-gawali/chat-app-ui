import { FormEvent, useEffect, useState } from 'react';
import { LoginDto, SignupDto } from '../dtos';
import { Link, useNavigate } from 'react-router';
import { useCreateUser, useGetMe, useLogin } from '../hooks';
import { extractErrorMessage } from '../utils/error';

const Signup = () => {
  const [signupForm, setSignupForm] = useState(new SignupDto());
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();
  const navigate = useNavigate();
  const { data } = useGetMe();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Please check correct and incorrect password');
    }
    setError(null);
    try {
      console.log(signupForm);
      await createUser({
        variables: {
          createUserInput: {
            email: signupForm.email,
            password: signupForm.password,
            firstName: signupForm.firstName,
            lastName: signupForm.lastName,
          },
        },
      });
      const loginData = new LoginDto(signupForm.email, signupForm.password);
      // handleReset();
      await login(loginData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      console.error(err);
      if (errorMessage) {
        setError(errorMessage);
      }
      setError('Unknowd error occured !!!');
    }
  };

  const handleReset = () => {
    setSignupForm(new SignupDto());
    setError(null);
  };

  return (
    <div className='px-4 mx-4 mt-[30vh]'>
      <form className='max-w-md mx-auto' onSubmit={handleSignup}>
        {/* Display Error Message */}
        {error && (
          <div className='mb-4 text-sm text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md'>
            {error}
          </div>
        )}
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            name='email'
            id='email'
            className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            onChange={handleInputChange}
            value={signupForm.email}
          />
          <label
            htmlFor='email'
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
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            onChange={handleInputChange}
            value={signupForm.password}
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
              signupForm.password != signupForm.confirmPassword
                ? 'border-b-2 border-red-300'
                : 'border-b-2 border-gray-300'
            }`}
            placeholder=' '
            required
            onChange={handleInputChange}
            value={signupForm.confirmPassword}
          />
          <label
            htmlFor='confirmPassword'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Confirm password
          </label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='firstName'
              id='name'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              onChange={handleInputChange}
              value={signupForm.firstName}
            />
            <label
              htmlFor='firstName'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              First name
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='lastName'
              id='lastName'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              onChange={handleInputChange}
              value={signupForm.lastName}
            />
            <label
              htmlFor='lastName'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Last name
            </label>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-center w-full'>
          <button
            type='submit'
            className='m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'
          >
            Submit
          </button>
          <button
            className='cursor-pointer m-2 py-2.5 px-5 text-sm w-full sm:w-auto font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className='text-center my-3 underline text-blue-400 hover:text-blue-700 dark:text-white'>
          <Link className='p-2 text-md' to='/login'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
