import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kaoru Muta</title>
        <meta name='description' content="Kaoru Muta's personal website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Kaoru Muta</main>

      <footer></footer>
    </div>
  );
};

export default Home;
