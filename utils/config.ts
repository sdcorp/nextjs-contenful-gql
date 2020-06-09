const _CONFIG = {
  SPACE_ID: process.env.NEXT_CMS_CONTENTFUL_SPACE_ID,
  ACCESS_TOKEN: process.env.NEXT_CMS_CONTENTFUL_ACCESS_TOKEN,
  ALGOLIA_APP_ID: process.env.NEXT_ALGOLIA_APP_ID,
  ALGOLIA_ADMIN_API_KEY: process.env.NEXT_ALGOLIA_ADMIN_API_KEY,
  ALGOLIA_SEARCH_API_KEY: process.env.NEXT_ALGOLIA_SEARCH_API_KEY,
};

type C = typeof _CONFIG;
type K = keyof C;

export const CONFIG = (() => {
  const newConfig = {} as Record<K, string>;
  for (const key in _CONFIG) {
    newConfig[key as K] = _CONFIG[key as K] || '';
  }
  return newConfig;
})();
