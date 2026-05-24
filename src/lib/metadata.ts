export const SITE_NAME = 'tionblog';
export const SITE_DESCRIPTION =
  'Personal website hosted by Kaoru Muta. tionblogへようこそ。技術のアウトプットだけでなく、日々の備忘録も残しています。';
export const SITE_URL = process.env.HOST ?? 'https://kaorumuta.me';

export const absoluteUrl = (path: string) => {
  return new URL(path, SITE_URL).toString();
};
