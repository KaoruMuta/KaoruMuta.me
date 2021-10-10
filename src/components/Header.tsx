import Link from 'next/link';
import { FcApproval } from 'react-icons/fc';
import { AppConstants } from '../constants/AppConstants';
import LinkButton from './LinkButton';

const Header = ({ currentPath }: { currentPath: string }) => {
  return (
    <header>
      <nav className="flex items-start font-semibold pt-8 space-x-4 xl:space-x-8">
        <span className="inline-flex flex-1 items-center">
          <Link href={AppConstants.HomePage.PATH}>
            <a className="xl:hover:opacity-hover">{AppConstants.HomePage.TITLE}</a>
          </Link>
          <FcApproval className="ml-1" />
        </span>
        <LinkButton
          destination={AppConstants.HomePage.PATH}
          isHighlighted={currentPath === AppConstants.HomePage.PATH}
          name={AppConstants.HomePage.NAME}
        />
        <LinkButton
          destination={AppConstants.BlogPage.PATH}
          isHighlighted={currentPath.startsWith(AppConstants.BlogPage.PATH)}
          name={AppConstants.BlogPage.NAME}
        />
      </nav>
    </header>
  );
};

export default Header;
