import { AppConstants } from 'constants/AppConstants';
import { EmergencyExitIcon } from 'icons/emergency-exit';
import Link from 'next/link';
import LinkButton from './LinkButton';

const Header = ({ currentPath }: { currentPath: string }) => {
  return (
    <header>
      <nav className="flex items-start font-semibold pt-8 space-x-4 xl:space-x-8">
        <span className="inline-flex flex-1 items-center">
          <Link href={AppConstants.HomePage.PATH} className="xl:hover:opacity-hover mr-1">
            {AppConstants.HomePage.TITLE}
          </Link>
          <EmergencyExitIcon />
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
