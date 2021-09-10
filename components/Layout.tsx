import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='mx-8 md:mx-48 lg:mx-72'>
      <Head>
        <title>Kaoru Muta</title>
        <meta name='description' content="Kaoru Muta's personal website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='my-48'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
