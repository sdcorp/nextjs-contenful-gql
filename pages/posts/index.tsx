import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { gql } from '@apollo/client';
import { apolloClient } from '../../utils/apolloClient';
import { PostPreview } from '../../components/PostPreview';
import { CSSProperties } from 'react';

const GET_POSTS = gql`
  query GetPosts {
    blogPostCollection {
      total
      items {
        sys {
          id
        }
        slug
        title
        description
        publishDate
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
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1rem',
};

const Posts: React.FC<Props> = ({ posts, total }) => {
  const { pathname } = useRouter();
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Posts List. Total: {total}</h1>

      <p>You are currently on: {pathname}</p>
      <div style={postListStyle}>
        {posts.map((p) => (
          <PostPreview key={p.sys.id} data={p} />
        ))}
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
