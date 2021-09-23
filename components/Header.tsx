import Link from 'next/link';
import { useRouter } from 'next/router';
import { FcApproval } from 'react-icons/fc';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex flex-row items-start font-sans font-semibold pt-8 space-x-4 xl:space-x-8">
      <span className="inline-flex flex-1 items-center">
        <Link href="/">
          <a>KaoruMuta.me.</a>
        </Link>
        <FcApproval className="ml-1" />
      </span>
      <Link href="/">
        <a className={router.asPath === '/' ? 'border-b border-black' : 'border-b border-white'}>Home</a>
      </Link>
      <Link href="/blog">
        <a className={router.asPath.startsWith('/blog') ? 'border-b border-black' : 'border-b border-white'}>Blog</a>
      </Link>
    </header>
  );
};

export default Header;
