import Head from 'next/head';
import { ReactNode } from 'react';
import { createSiteTitle } from '../lib/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, currentPath }: { children?: ReactNode; currentPath: string }) => {
  const siteTitle = createSiteTitle(currentPath);

  return (
    <div className="flex flex-col mx-4 sm:mx-16 md:mx-56 h-screen">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Kaoru Muta's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header currentPath={currentPath} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
