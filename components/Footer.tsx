import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-row font-sans pb-8">
      <span className="block flex-1 font-semibold">&copy; 2021 Kaoru Muta.</span>
      <Link href="/privacy-policy">
        <a className="block justify-end">Privacy Policy</a>
      </Link>
    </footer>
  );
};

export default Footer;
