import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    HOST: isProduction ? 'https://kaorumuta.me' : 'http://localhost:3000',
    GOOGLE_ANALYTICS_ID: isProduction ? 'G-PM1SZSW2WT' : '',
    GOOGLE_ADSENSE_CLIENT_ID: 'ca-pub-8671682597497935',
    GOOGLE_ADSENSE_SLOT_ID: '1520904619',
  },
};

export default nextConfig;
