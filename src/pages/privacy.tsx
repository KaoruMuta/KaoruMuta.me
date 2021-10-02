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
        <h2>個人情報の利用目的</h2>
        <p>
          当サイトでは、お問い合わせの際、名前やメールアドレス等の個人情報を取得することがあります。
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>
        <h2>広告について</h2>
        <p>
          当ブログでは、第三者配信の広告サービスであるGoogle
          Adsenseを利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、Cookieを使用しております。
          Cookieを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
        </p>
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
        <h2>アクセス解析ツールについて</h2>
        <p>
          当サイトでは、Googleによるアクセス解析ツールであるGoogle Analyticsを利用しています。 Google
          Analyticsはトラフィックデータの収集のためにCookieを使用しております。
          トラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
      </article>
    </>
  );
};

export default Privacy;
