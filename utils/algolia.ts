import algoliasearch from 'algoliasearch/lite';
import { CONFIG } from './config';

export const getSearchClient = () => {
  const appId = CONFIG.ALGOLIA_APP_ID;
  const adminKey = CONFIG.ALGOLIA_SEARCH_API_KEY;
  return algoliasearch(appId, adminKey);
};
