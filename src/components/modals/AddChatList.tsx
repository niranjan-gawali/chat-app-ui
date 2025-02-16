import React, { useState } from 'react';
import { useCreateChat } from '../../hooks/useCreateChat';
import { useNavigate } from 'react-router';

interface AddChatListProps {
  onClose: () => void;
}

const AddChatList: React.FC<AddChatListProps> = ({ onClose }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [createChat, { error: apiError }] = useCreateChat();
  const naviate = useNavigate();

  const handleCreateChat = async () => {
    if (!recipient.trim()) {
      setError('Recipient name is required.');
      return;
    }

    try {
      const chat = await createChat({
        variables: {
          createChatInput: { isPrivate, name: recipient },
        },
      });
      setError(null);
      onClose();
      naviate(`/chat/${chat.data?.createChat._id}`);
    } catch (err) {
      console.error('Chat creation failed:', err);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
      <div className='bg-white p-5 rounded-lg shadow-lg w-96'>
        {/* Modal Header */}
        <div className='flex justify-between items-center border-b pb-2'>
          <h3 className='text-lg font-semibold'>Create Chat</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-black cursor-pointer'
          >
            ✖
          </button>
        </div>

        {/* Private/Public Toggle */}
        <div className='mt-4 flex items-center justify-between'>
          <span className='font-semibold'>
            {isPrivate ? 'Private' : 'Public'}
          </span>
          <div
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all ${
              isPrivate ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => {
              setIsPrivate(!isPrivate);
              setRecipient('');
              setError(null);
            }}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
                isPrivate ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>

        {/* Input Field */}
        <input
          type='text'
          className={`w-full border rounded-lg p-2 mt-3 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={
            isPrivate ? 'Search for a person...' : 'Enter recipient name...'
          }
          value={recipient}
          onChange={(e) => {
            setRecipient(e.target.value);
            setError(null); // Clear error when typing
          }}
        />
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

        {/* API Error Message */}
        {apiError && (
          <p className='text-red-500 text-sm mt-1'>Failed to create chat.</p>
        )}

        {/* Action Buttons */}
        <div className='mt-4 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChatList;
