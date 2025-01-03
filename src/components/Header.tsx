import { EmergencyExitIcon } from 'icons/emergency-exit';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="flex items-start font-semibold pt-8 space-x-4 xl:space-x-8">
        <span className="inline-flex flex-1 items-center">
          <Link href="/" className="xl:hover:opacity-hover mr-1">
            KaoruMuta.me.
          </Link>
          <EmergencyExitIcon />
        </span>
      </nav>
    </header>
  );
};

export default Header;
