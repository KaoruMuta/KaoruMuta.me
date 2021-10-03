import Head from 'next/head';
import Title from '../components/Title';
import { AppConstants } from '../constants/AppConstants';

const Privacy = () => {
  return (
    <>
      <Head>
        <title>{AppConstants.PrivacyPage.TITLE}</title>
      </Head>
      <article className="prose max-w-none my-16">
        <Title name={AppConstants.PrivacyPage.NAME} />
        <h2>{AppConstants.PrivacyPage.CONTENTS.PERSONAL_INFORMATION.title}</h2>
        <p>{AppConstants.PrivacyPage.CONTENTS.PERSONAL_INFORMATION.description}</p>
        <h2>{AppConstants.PrivacyPage.CONTENTS.ADVERTISEMENT.title}</h2>
        <p>{AppConstants.PrivacyPage.CONTENTS.ADVERTISEMENT.description}</p>
        <p>
          Cookieを無効にする方法やGoogle Adsenseに関する詳細は「
          <a
            href="https://policies.google.com/technologies/ads?gl=jp"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="広告 - ポリシーと規約 - Google (新しいタブで開く)"
          >
            広告 – ポリシーと規約 – Google
          </a>
          」をご確認ください。
        </p>
        <h2>{AppConstants.PrivacyPage.CONTENTS.ANALYSIS.title}</h2>
        <p>{AppConstants.PrivacyPage.CONTENTS.ANALYSIS.description}</p>
      </article>
    </>
  );
};

export default Privacy;
