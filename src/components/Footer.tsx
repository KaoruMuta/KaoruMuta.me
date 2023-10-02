import { AppConstants } from 'constants/AppConstants';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex pb-8">
      <span className="block flex-1 font-semibold">&copy; {AppConstants.Me.COPYRIGHT}</span>
      <Link
        href={AppConstants.PrivacyPage.PATH}
        className="block justify-end xl:hover:opacity-hover">
        {AppConstants.PrivacyPage.NAME}
      </Link>
    </footer>
  );
};

export default Footer;
