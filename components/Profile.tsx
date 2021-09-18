import Image from 'next/image';
import { FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';
import MyPicture from '../public/me.png';

const Profile = () => {
  return (
    <div className='flex flex-auto flex-col-reverse items-center justify-center min-h-full xl:flex-row'>
      <div className='mt-8 text-center xl:mt-0 xl:text-left'>
        <div className='font-sans cursor-default'>
          <span className='font-semibold text-4xl sm:text-5xl md:text-6xl xl:text-7xl'>Kaoru Muta</span>
          <br></br>
          <span className='text-sm sm:text-base md:text-xl xl:text-2xl'>Application Engineer</span>
        </div>
        <div className='flex flex-row mt-8 space-x-8 justify-center xl:justify-start'>
          <a href='https://twitter.com/m_t_tion1'>
            <FaTwitter className='h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 hover:opacity-60' />
          </a>
          <a href='https://www.facebook.com/mentos.muta'>
            <FaFacebook className='h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 hover:opacity-60' />
          </a>
          <a href='https://github.com/KaoruMuta'>
            <FaGithub className='h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 hover:opacity-60' />
          </a>
        </div>
      </div>
      <div className='xl:flex-grow' />
      <div className='w-52 sm:w-60 md:w-80 xl:w-auto'>
        <Image
          className='rounded-full'
          src={MyPicture}
          alt="Kaoru Muta's picture"
          height={400}
          width={400}
          quality='100'
        />
      </div>
    </div>
  );
};

export default Profile;
