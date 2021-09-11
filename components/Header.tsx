import { FcApproval } from 'react-icons/fc';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-row font-sans font-semibold mt-8'>
      <span className='inline-flex flex-1 items-center'>
        KaoruMuta.me.
        <FcApproval className='ml-1' />
      </span>
      <Link href='/'>
        <a className='flex-none'>Home</a>
      </Link>
      <Link href='/articles'>
        <a className='flex-none ml-8'>Articles</a>
      </Link>
    </header>
  );
};

export default Header;
