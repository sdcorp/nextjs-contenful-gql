import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../../components/Layout';
import { gql } from '@apollo/client';
import { apolloClient } from '../../utils/apolloClient';

type Props = {
  item?: any;
  errors?: string;
};

const GET_SLUGS = gql`
  query GetSlugs {
    blogPostCollection {
      items {
        slug
        sys {
          id
        }
      }
    }
  }
`;

const GET_POST = gql`
  query GetPostById($id: String!) {
    blogPost(id: $id) {
      title
      description
    }
  }
`;

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`Next.js + TypeScript Example`}>
      {item && (
        <div>
          <h1>Title: {item.title}</h1>
          <p>Description: {item.description}</p>
        </div>
      )}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const slugResponse = await apolloClient.query({ query: GET_SLUGS });
  const slugs = slugResponse.data.blogPostCollection.items;
  const paths = slugs.map(({ slug, sys: { id } }: any) => ({ params: { slug, fields: { id } } }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // console.log({ path: paths[0] });
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slugParam = params?.slug;
    const slugResponse = await apolloClient.query({ query: GET_SLUGS });
    const slugs = slugResponse.data.blogPostCollection.items;
    const postId = slugs.find(({ slug }: any) => slug === slugParam)?.sys?.id;
    const { data: post } = await apolloClient.query({ query: GET_POST, variables: { id: String(postId) } });
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item: post?.blogPost ?? null } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
