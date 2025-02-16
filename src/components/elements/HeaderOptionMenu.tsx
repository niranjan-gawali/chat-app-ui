import { Link } from 'react-router';

type HeaderOptionMenuProps = {
  subMenu: boolean;
  isAuthenticated: boolean;
};

const HeaderOptionMenu = ({
  subMenu,
  isAuthenticated,
}: HeaderOptionMenuProps) => {
  return (
    <nav className='w-full'>
      {/* ✅ Desktop Menu - Positioned Between Logo & User Menu */}
      <div className='hidden md:flex flex-1 justify-center items-center space-x-6'>
        {!isAuthenticated ? (
          <>
            <Link to='/login' className='text-gray-900 hover:text-blue-700'>
              Login
            </Link>
            <Link to='/signup' className='text-gray-900 hover:text-blue-700'>
              Signup
            </Link>
          </>
        ) : (
          <Link to='/' className='text-gray-900 hover:text-blue-700'>
            Home
          </Link>
        )}
      </div>

      {/* ✅ Mobile Dropdown Menu (Only when subMenu is true) */}
      {subMenu && (
        <div className='w-full md:hidden bg-white dark:bg-gray-800 p-4'>
          <ul className='flex flex-col space-y-2'>
            <li>
              <Link to='/' className='block text-gray-900 hover:text-blue-700'>
                Home
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to='/login'
                    className='block text-gray-900 hover:text-blue-700'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/signup'
                    className='block text-gray-900 hover:text-blue-700'
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to='/profile'
                  className='block text-gray-900 hover:text-blue-700'
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HeaderOptionMenu;
