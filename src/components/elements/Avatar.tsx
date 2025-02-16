const Avatar = ({ name }: { name?: string }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white font-semibold'>
      {initial}
    </div>
  );
};

export default Avatar;
