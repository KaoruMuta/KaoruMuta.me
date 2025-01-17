import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

const Share = ({ url, title }: { url: string; title: string }) => {
  return (
    <section className="flex space-x-2">
      <TwitterShareButton url={url} title={title} hashtags={['tionblog']}>
        <XIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={32} round={true} />
      </HatenaShareButton>
    </section>
  );
};

export default Share;
