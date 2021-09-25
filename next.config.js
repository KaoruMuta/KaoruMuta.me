/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,
  env: {
    HOST: isProduction ? 'http://localhost:3000' : 'https://KaoruMuta.me',
  },
};
