import { useParams } from 'react-router';
import { useCreateMessage, useGetChat, useGetMessage } from '../hooks';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { Avatar } from '../components';
import { Message } from '../gql/graphql';

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const chatId = params._id ?? '';
  const { data } = useGetChat({ _id: chatId ?? '' });
  const [createMessage] = useCreateMessage();
  const { data: existingMessages } = useGetMessage({ chatId });

  console.log('TEMP DATA ');
  console.log(data?.chat);

  const { name, latestMessages } = data?.chat ?? {};

  const { firstName } = latestMessages?.user ?? {};

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // combine messages
  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages.messages);
    }
  }, [existingMessages]);

  // useEffect(() => {
  //   const existingLatestMessage = messages[messages.length - 1]?._id;
  //   if (
  //     latestMessage?.messageCreated &&
  //     existingLatestMessage !== latestMessage.messageCreated._id
  //   ) {
  //     setMessages([...messages, latestMessage.messageCreated]);
  //   }
  // }, [latestMessage, messages]);

  const handleCreateMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage({
      variables: {
        createMessageInput: {
          content: message,
          chatId: chatId ?? '',
        },
      },
    });
    setMessage('');
  };

  return (
    <div className='flex flex-col h-screen w-full px-10 shadow-2xl'>
      {/* Chat Name - Fixed at the Top */}
      <div className='py-4 bg-white shadow-md text-center sticky top-0 z-10'>
        <h1 className='text-2xl sm:text-3xl font-bold'>{name}</h1>
      </div>

      {/* Wrapper to Ensure Scrolling Works Properly */}
      <div className='flex-1 h-[calc(100vh-10rem)] overflow-y-auto p-4 space-y-4'>
        {[...messages]
          .sort(
            (msgA, msgB) =>
              new Date(msgA.createdAt).getTime() -
              new Date(msgB.createdAt).getTime()
          )
          .map((message) => (
            <div key={message._id} className='flex items-start gap-2.5'>
              <Avatar name={firstName ?? ''} />
              <div className='flex flex-col w-full max-w-[320px] p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 cursor-pointer'>
                <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                  <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                    {new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    }).format(new Date(message.createdAt))}
                  </span>
                </div>
                <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll reference */}
      </div>

      {/* Input Box - Fixed at the Bottom */}
      <div className='p-4 bg-white shadow-md sticky bottom-0 w-full mb-10'>
        <form
          onSubmit={handleCreateMessage}
          className='flex items-center gap-3 w-full max-w-2xl mx-auto'
        >
          <input
            type='text'
            className='flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your message...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className='bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition'
            type='submit'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
