import React, { CSSProperties } from 'react';
import Link from 'next/link';

type Props = {
  data: any;
};

const cardStyle: CSSProperties = {
  backgroundColor: 'turquoise',
  borderRadius: '20px',
  padding: '1rem',
};

export const PostPreview = ({ data: p }: Props) => (
  <div style={cardStyle}>
    <h1>{p.title}</h1>
    <p>{p.description}</p>
    <time>{new Date(p.publishDate).toLocaleString()}</time>
    <p>
      <Link href="/posts/[slug]" as={`/posts/${p.slug}`}>
        <a>Read more</a>
      </Link>
    </p>
  </div>
);
