import { FcApproval } from 'react-icons/fc';

const Header = () => {
  return (
    <header className='flex flex-row font-sans font-semibold mt-8'>
      <span className='inline-flex flex-1 items-center'>
        KaoruMuta.me.
        <FcApproval className='ml-1' />
      </span>
      <span className='flex-none'>Career</span>
      <span className='flex-none ml-8'>Works</span>
      <span className='flex-none ml-8'>Articles</span>
    </header>
  );
};

export default Header;
