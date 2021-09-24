import { AppConstants } from '../constants/AppConstants';

export const createSiteTitle = (path: string) => {
  if (path === AppConstants.HomePage.PATH) {
    return AppConstants.HomePage.TITLE;
  } else if (path.startsWith(AppConstants.BlogPage.PATH)) {
    return AppConstants.BlogPage.TITLE;
  }
};
