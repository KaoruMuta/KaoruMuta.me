export namespace AppConstants {
  export namespace Me {
    export const NAME = 'Kaoru Muta';
    export const ROLE = 'Applications Engineer';
    export const TWITTER_URL = 'https://twitter.com/m_t_tion1';
    export const FACEBOOK_URL = 'https://www.facebook.com/mentos.muta';
    export const GITHUB_URL = 'https://github.com/KaoruMuta';
    export const ALT_TEXT = "Kaoru Muta's picture";
    export const COPYRIGHT = '2021 Kaoru Muta.';
  }

  export namespace HomePage {
    export const NAME = 'Home';
    export const TITLE = 'KaoruMuta.me.';
    export const CONTENT = 'Personal website hosted by Kaoru Muta.';
    export const PATH = '/';
  }

  export namespace BlogPage {
    export const NAME = 'Blog';
    export const TITLE = 'tionblog';
    export const CONTENT = 'tionblogへようこそ。技術のアウトプットだけでなく、日々の備忘録も残しています。';
    export const PATH = '/blog';
  }

  export namespace PrivacyPage {
    export const NAME = 'Privacy Policy';
    export const TITLE = 'Privacy Policy';
    export const PATH = '/privacy';
    export const CONTENTS = {
      PERSONAL_INFORMATION: {
        title: '個人情報の利用目的',
        description: `
          当サイトでは、お問い合わせの際、名前やメールアドレス等の個人情報を取得することがあります。
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。`,
      },
      ADVERTISEMENT: {
        title: '広告について',
        description: `
          当ブログでは、第三者配信の広告サービスであるGoogle Adsenseを利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、Cookieを使用しております。
          Cookieを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。`,
      },
      ANALYSIS: {
        title: 'アクセス解析ツールについて',
        description: `
          当サイトでは、Googleによるアクセス解析ツールであるGoogle Analyticsを利用しています。
          Google Analyticsはトラフィックデータの収集のためにCookieを使用しております。
          トラフィックデータは匿名で収集されており、個人を特定するものではありません。`,
      },
    };
  }
}
