export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export const pageview = (url: string) => {
  if (!GOOGLE_ANALYTICS_ID) {
    return;
  }
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
