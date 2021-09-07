import type { NextPage } from 'next';
import Head from 'next/head';
import Profile from '../components/Profile';

const Home: NextPage = () => {
  return (
    <div className='mx-8 md:mx-48 lg:mx-72 my-48'>
      <Head>
        <title>Kaoru Muta</title>
        <meta name='description' content="Kaoru Muta's personal website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Profile />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
