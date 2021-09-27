/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,
  env: {
    HOST: isProduction ? 'https://KaoruMuta.me' : 'http://localhost:3000',
    GOOGLE_ANALYTICS_ID: isProduction ? 'G-PM1SZSW2WT' : '',
  },
};
