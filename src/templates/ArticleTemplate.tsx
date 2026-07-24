import React from 'react';
import { graphql } from 'gatsby';
import ArticleLayout from '../components/layouts/ArticleLayout';
import Meta from '../components/Meta';

interface ArticleTemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: { title: string; date: string };
    };
  };
}

export default function ArticleTemplate({ data }: ArticleTemplateProps) {
  const { markdownRemark: post } = data;
  return (
    <ArticleLayout title={post.frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </ArticleLayout>
  );
}

export const pageQuery = graphql`
  query IngredientPostByPath($filePath: String!) {
    markdownRemark(frontmatter: { path: { eq: $filePath } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export const Head = ({ data }: ArticleTemplateProps) => {
  const title = data?.markdownRemark?.frontmatter?.title;
  return <Meta title={title} />;
};
