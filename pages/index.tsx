import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import TwitterIcon from '../public/twitter.svg';
import FacebookIcon from '../public/facebook.svg';
import GitHubIcon from '../public/github.svg';
import MyPicture from '../public/me.png';

const Home: NextPage = () => {
  return (
    <div className='mx-8 md:mx-48 lg:mx-72 my-48'>
      <Head>
        <title>Kaoru Muta</title>
        <meta name='description' content="Kaoru Muta's personal website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-row flex-auto items-center'>
        <div>
          <span className='font-sans font-semibold text-6xl'>Kaoru Muta</span>
          <br></br>Application Engineer
          <div className='flex flex-row h-8 mt-8 gap-x-8'>
            <TwitterIcon className='h-8 w-8' />
            <FacebookIcon className='h-8 w-8' />
            <GitHubIcon className='h-8 w-8' />
          </div>
        </div>
        <div className='flex-grow' />
        <Image
          className='rounded-full'
          src={MyPicture}
          alt="Kaoru Muta's picture"
          height='400'
          width='400'
          quality='100'
        />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
