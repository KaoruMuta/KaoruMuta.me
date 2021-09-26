import Link from 'next/link';
import { AppConstants } from '../constants/AppConstants';

const Footer = () => {
  return (
    <footer className="flex flex-row font-sans pb-8">
      <span className="block flex-1 font-semibold">&copy; 2021 Kaoru Muta.</span>
      <Link href={AppConstants.PrivacyPage.PATH}>
        <a className="block justify-end hover:opacity-hover">{AppConstants.PrivacyPage.NAME}</a>
      </Link>
    </footer>
  );
};

export default Footer;
