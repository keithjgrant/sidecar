import React from 'react';
import { Link } from 'gatsby';
import ArticleLayout from '../components/layouts/ArticleLayout';
import Meta from '../components/Meta';

const NotFoundPage = () => (
  <ArticleLayout>
    <h1>Not Found</h1>
    <p>No page found at this address.</p>
    <p>
      <Link to="/explore">Explore all drinks</Link>
    </p>
  </ArticleLayout>
);

export default NotFoundPage;

export const Head = () => <Meta title="Not found" />;
