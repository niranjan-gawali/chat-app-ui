import { Outlet } from 'react-router';
import { ChatList } from '../components';
import { useState, useEffect } from 'react';

const Home = () => {
  const [viewChatList, setViewChatList] = useState(true);

  // Prevent scrolling on the entire page
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='flex relative h-screen overflow-hidden space-x-3.5'>
      {/* Toggle Button - Always Visible */}
      {!viewChatList && (
        <button
          className='fixed top-20 left-4 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-50 cursor-pointer'
          onClick={() => setViewChatList(true)}
        >
          ☰
        </button>
      )}

      {/* Chat List Panel */}
      {viewChatList && (
        <div className='h-screen'>
          <ChatList
            setViewChatList={setViewChatList}
            viewChatList={viewChatList}
          />
        </div>
      )}

      {/* Chat Content - Outlet should not make the whole page scroll */}
      <div className='h-screen flex-1 overflow-hidden ml-5'>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
