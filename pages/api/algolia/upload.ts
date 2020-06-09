import { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';
import { apolloClient } from '../../../utils/apolloClient';
import { GET_POSTS } from '../../posts';
import { CONFIG } from '../../../utils/config';

const client = algoliasearch(CONFIG.ALGOLIA_APP_ID, CONFIG.ALGOLIA_ADMIN_API_KEY);

const index = client.initIndex('nxt_posts');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      // Process a POST request
    } else {
      // Handle any other HTTP method
      const postsCollection = await apolloClient.query({ query: GET_POSTS });
      const posts = postsCollection?.data?.blogPostCollection?.items ?? [];
      // @ts-ignore
      const algoPosts = posts.map(({ sys: { id }, __typename, ...post }) => ({ ...post, objectID: id }));

      const objIds = await index.saveObjects(algoPosts);

      res.status(200).json({ msg: 'OK', data: { posts, objIds, algoPosts } });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
