/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,
  env: {
    HOST: isProduction ? 'https://KaoruMuta.me' : 'http://localhost:3000',
    GOOGLE_ANALYTICS_ID: isProduction ? 'G-PM1SZSW2WT' : '',
    GOOGLE_ADSENSE_CLIENT_ID: 'ca-pub-8671682597497935',
    GOOGLE_ADSENSE_SLOT_ID: '1520904619',
  },
  // NOTE: Googleのインデックスに `.md` 付きのURLが登録されているため、一時的にリダイレクトを設定
  // See: https://vercel.com/docs/edge-network/redirects
  async redirects() {
    return [
      {
        "source": "/blog/posts/:slug.md",
        "destination": "/blog/posts/:slug",
        "permanent": true
      }
    ]
  }
};
