interface ChatListProps {
  name?: string | null;
  isSelected: boolean;
}

const ChatItem = ({ name, isSelected }: ChatListProps) => {
  return (
    <div className='w-full'>
      <div
        className={`flex items-center w-full p-3 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer ${
          isSelected ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        {/* Avatar Section */}
        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-amber-300 text-lg font-semibold text-gray-800'>
          R
        </div>

        {/* Chat Content */}
        <div className='ml-3 flex-1 min-w-0'>
          {' '}
          {/* min-w-0 ensures flex-1 doesn't overflow */}
          <h1 className='font-medium text-gray-900 text-base'>{name}</h1>
          <p className='text-sm text-gray-500 truncate w-full'>
            I'll be in your neighborhood
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
