import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex pb-8">
      <span className="block flex-1 font-semibold">&copy; 2021 Kaoru Muta.</span>
      <Link href="privacy" className="block justify-end xl:hover:opacity-hover">
        Privacy Policy
      </Link>
    </footer>
  );
};

export default Footer;
