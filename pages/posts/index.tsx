import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { gql } from '@apollo/client';
import { apolloClient } from '../../utils/apolloClient';
import { PostPreview } from '../../components/PostPreview';
import { CSSProperties } from 'react';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { getSearchClient } from '../../utils/algolia';

export const GET_POSTS = gql`
  query GetPosts {
    blogPostCollection {
      items {
        title
        slug
        description
        publishDate
        tags
        sys {
          id
        }
      }
    }
  }
`;

type Props = {
  posts: any[];
  total: number;
};

const postListStyle: CSSProperties = {
  display: 'grid',
  // gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gridAutoColumns: '1fr',
  gridAutoFlow: 'column',
  justifyItems: 'center',
  gap: '1rem',
  marginTop: '2rem',
};

const searchBarStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto 75%',
  columnGap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
};

const CustomHits = connectHits(({ hits }) => (
  <div style={postListStyle}>
    {hits.map((p) => (
      <PostPreview key={p.objectID} data={p} />
    ))}
  </div>
));

const Posts: React.FC<Props> = ({ total }) => {
  const { pathname } = useRouter();
  const searchClient = getSearchClient();
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Posts List. Total: {total}</h1>

      <p>You are currently on: {pathname}</p>
      <div>
        <InstantSearch searchClient={searchClient} indexName="nxt_posts">
          <div style={searchBarStyle}>
            <img src="/search-by-algolia-light-background.svg" alt="Algolia Light" />
            <SearchBox showLoadingIndicator />
          </div>
          <CustomHits />
        </InstantSearch>
      </div>

      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const postsCollection = await apolloClient.query({ query: GET_POSTS });
  const props = {
    posts: postsCollection?.data?.blogPostCollection?.items ?? null,
    total: postsCollection?.data?.blogPostCollection?.total ?? 0,
  };
  return { props };
};

export default Posts;
