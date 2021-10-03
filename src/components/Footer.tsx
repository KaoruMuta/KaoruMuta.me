import Link from 'next/link';
import { AppConstants } from '../constants/AppConstants';

const Footer = () => {
  return (
    <footer className="flex flex-row pb-8">
      <span className="block flex-1 font-semibold">&copy; {AppConstants.Me.COPYRIGHT}</span>
      <Link href={AppConstants.PrivacyPage.PATH}>
        <a className="block justify-end xl:hover:opacity-hover">{AppConstants.PrivacyPage.NAME}</a>
      </Link>
    </footer>
  );
};

export default Footer;
