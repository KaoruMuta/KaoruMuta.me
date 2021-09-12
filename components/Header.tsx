import { FcApproval } from 'react-icons/fc';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-row font-sans font-semibold mt-8 space-x-4 xl:space-x-8'>
      <span className='inline-flex flex-1 items-center cursor-default'>
        KaoruMuta.me.
        <FcApproval className='ml-1' />
      </span>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/articles'>
        <a>Articles</a>
      </Link>
    </header>
  );
};

export default Header;
