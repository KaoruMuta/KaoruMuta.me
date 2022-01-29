import Profile from 'components/Profile';
import { AppConstants } from 'constants/AppConstants';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content={AppConstants.HomePage.CONTENT} />
        <title>{AppConstants.HomePage.TITLE}</title>
      </Head>
      <Profile />
    </>
  );
};

export default Home;
