import { FcApproval } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <header className='flex flex-row items-start font-sans font-semibold mt-8 space-x-4 xl:space-x-8'>
      <span className='inline-flex flex-1 items-center cursor-default'>
        KaoruMuta.me.
        <FcApproval className='ml-1' />
      </span>
      <Link href='/'>
        <a className={router.asPath === '/' ? 'border-b border-black' : 'border-b border-white'}>Home</a>
      </Link>
      <Link href='/blog'>
        <a className={router.asPath === '/blog' ? 'border-b border-black' : 'border-b border-white'}>Blog</a>
      </Link>
    </header>
  );
};

export default Header;
