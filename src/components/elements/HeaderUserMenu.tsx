import { Link } from 'react-router';
import { useLogout } from '../../hooks';
import client from '../../constants/apollo-client';
import { authenticatedVar } from '../../constants/authenticated';

type HeaderUserMenuProps = {
  userMenu: boolean;
};

const HeaderUserMenu = ({ userMenu }: HeaderUserMenuProps) => {
  const { logout } = useLogout();
  // const navigate = useNavigate();
  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await logout();
    authenticatedVar(false);
    client.resetStore();
  };

  return (
    <div className='relative'>
      <div
        className={`absolute left-0 mt-2 min-w-[180px] z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600 transition-all duration-200 ease-in-out ${
          userMenu ? 'opacity-100 translate-y-2 visible' : 'opacity-0 invisible'
        }`}
        id='user-dropdown'
      >
        <div className='px-4 py-3'>
          <span className='block text-sm font-medium text-gray-900 dark:text-white'>
            Bonnie Green
          </span>
          <span className='block text-xs text-gray-500 truncate dark:text-gray-400'>
            name@flowbite.com
          </span>
        </div>
        <ul className='py-2'>
          <li>
            <Link
              to='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Earnings
            </Link>
          </li>
          <li>
            <span
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer'
              onClick={handleLogout}
            >
              Sign out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderUserMenu;
