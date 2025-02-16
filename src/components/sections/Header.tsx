import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { HeaderOptionMenu, HeaderUserMenu } from '../elements';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../constants/authenticated';

const Header = () => {
  const [subMenu, showSubMenu] = useState(false);
  const [userMenu, showUserMenu] = useState(false);

  const userMenuRef = useRef<HTMLButtonElement>(null);

  const isAuthenticated = useReactiveVar(authenticatedVar);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setTimeout(() => showUserMenu(false), 150);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='sticky top-0 w-full z-50'>
      <nav className='bg-white border-gray-200 dark:bg-gray-900 shadow-xl w-full'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3'>
          {/* Logo & Title */}
          <Link
            to='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img
              src='https://www.svgrepo.com/show/15327/chat.svg'
              className='h-8'
              alt='Chat App Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Chat App
            </span>
          </Link>

          {/* Right-side Menu */}
          <div className='flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <>
              {isAuthenticated && (
                <button
                  type='button'
                  className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer'
                  id='user-menu-button'
                  onClick={() => showUserMenu(!userMenu)}
                  ref={userMenuRef}
                >
                  <span className='sr-only'>Open user menu</span>
                  <span className='rounded-full text-white text-center px-3 py-1 text-xl'>
                    R
                  </span>
                </button>
              )}
            </>

            <div>
              <HeaderUserMenu userMenu={userMenu} />
            </div>

            {/* Mobile Menu Button */}
            <button
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              onClick={() => showSubMenu(!subMenu)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
                aria-hidden='true'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {/* {subMenu && ( */}
        <div className='w-full  bg-white dark:bg-gray-800 p-4'>
          <HeaderOptionMenu
            subMenu={subMenu}
            isAuthenticated={isAuthenticated}
          />
        </div>
        {/* )} */}
      </nav>
    </header>
  );
};

export default Header;
