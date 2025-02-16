import { useState } from 'react';
import { ChatItem } from '../elements';
import { AddChatList } from '../modals';
import { useGetChats } from '../../hooks';
import { useNavigate, useParams } from 'react-router';

interface ChatListProps {
  setViewChatList: (value: boolean) => void;
  viewChatList: boolean;
}

const ChatList = ({ setViewChatList, viewChatList }: ChatListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetChats();
  const params = useParams();
  const chatId = params._id ?? '';

  // Close chat list on mobile when a chat is selected
  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
    if (window.innerWidth < 640) setViewChatList(false);
  };

  return (
    <div
      className='flex flex-col w-full sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12 
                 min-w-[400px] max-w-[500px] 
                 h-screen sm:h-[calc(100vh-3rem)] bg-white overflow-hidden shadow-2xl'
    >
      {/* Header with + Button */}
      <div className='h-16 flex items-center justify-between px-4 bg-gray-200 shadow-md'>
        <button
          className='text-2xl sm:text-3xl font-bold p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition'
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        <button
          type='button'
          className='p-2 w-10 h-10 flex items-center justify-center text-gray-500 rounded-lg hover:bg-gray-100'
          onClick={() => setViewChatList(!viewChatList)}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
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

      {/* Scrollable Chat List */}
      <div className='flex-1 overflow-y-auto p-1 space-y-2 bg-gray-100 max-h-full'>
        {data?.chats
          .map((chat) => (
            <div
              key={chat._id}
              className='cursor-pointer p-2 rounded-md hover:bg-gray-200 transition'
              onClick={() => handleChatClick(chat._id)}
            >
              <ChatItem
                name={chat.name}
                isSelected={chat?._id !== undefined && chat._id === chatId}
              />
            </div>
          ))
          .reverse()}
      </div>

      {/* Conditionally Render Modal */}
      {isModalOpen && <AddChatList onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ChatList;
