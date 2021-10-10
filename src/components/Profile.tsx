import Image from 'next/image';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { AppConstants } from '../constants/AppConstants';
import MyPicture from '../../public/me.png';

const Profile = () => {
  return (
    <div className="flex flex-auto flex-col-reverse items-center justify-center min-h-full xl:flex-row xl:justify-between">
      <div className="mt-8 text-center xl:mt-0 xl:text-left">
        <section className="cursor-default">
          <p className="font-semibold text-4xl sm:text-5xl md:text-6xl xl:text-7xl">{AppConstants.Me.NAME}</p>
          <p className="text-sm sm:text-base md:text-xl xl:text-2xl">{AppConstants.Me.ROLE}</p>
        </section>
        <section className="flex mt-8 space-x-8 justify-center xl:justify-start">
          <a href={AppConstants.Me.TWITTER_URL}>
            <FaTwitter className="h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 xl:hover:opacity-hover" />
          </a>
          <a href={AppConstants.Me.FACEBOOK_URL}>
            <FaFacebook className="h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 xl:hover:opacity-hover" />
          </a>
          <a href={AppConstants.Me.GITHUB_URL}>
            <FaGithub className="h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 xl:hover:opacity-hover" />
          </a>
        </section>
      </div>
      <div className="w-52 sm:w-60 md:w-80 xl:w-auto">
        <Image
          className="rounded-full"
          src={MyPicture}
          alt={AppConstants.Me.ALT_TEXT}
          height={400}
          width={400}
          quality={100}
        />
      </div>
    </div>
  );
};

export default Profile;
