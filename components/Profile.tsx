import Image from 'next/image';
import { FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';
import MyPicture from '../public/me.png';

const Profile = () => {
  return (
    <div className='flex flex-row flex-auto items-center'>
      <div>
        <span className='font-sans font-semibold text-6xl'>Kaoru Muta</span>
        <br></br>Application Engineer
        <div className='flex flex-row h-8 mt-8 gap-x-8'>
          <a href='https://twitter.com/m_t_tion1'>
            <FaTwitter className='h-8 w-8 hover:opacity-60' />
          </a>
          <a href='https://www.facebook.com/mentos.muta'>
            <FaFacebook className='h-8 w-8 hover:opacity-60' />
          </a>
          <a href='https://github.com/KaoruMuta'>
            <FaGithub className='h-8 w-8 hover:opacity-60' />
          </a>
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
    </div>
  );
};

export default Profile;
