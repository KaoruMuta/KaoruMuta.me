import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Ads = () => {
  const router = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [router.asPath]);

  return (
    <div key={router.asPath}>
      <ins
        className="adsbygoogle block"
        data-ad-client={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={process.env.GOOGLE_ADSENSE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Ads;
