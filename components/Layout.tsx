import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import { LayoutPropsType } from '../types/LayoutPropsType';

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <div className="flex flex-col mx-4 sm:mx-16 md:mx-56 h-screen">
      <Head>
        <title>Kaoru Muta</title>
        <meta name="description" content="Kaoru Muta's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
