import React from 'react';
import { Link, graphql } from 'gatsby';
import DrinkListLayout from '../components/layouts/DrinkListLayout';
import Meta from '../components/Meta';
import DrinkList from '../components/DrinkList';
import SimpleContent from '../components/SimpleContent';

export default function TagTemplate({
  data: { drinks, content, images },
  pageContext: { tag },
}) {
  const imageMap = {};
  images.edges.forEach(({ node: { name, childImageSharp } }) => {
    imageMap[name] = childImageSharp;
  });
  return (
    <DrinkListLayout title={`Tag: ${tag}`}>
      {content ? (
        <SimpleContent dangerouslySetInnerHTML={{ __html: content.html }} />
      ) : null}
      <Link className="button" to="/tags">
        Browse all tags
      </Link>
      <DrinkList
        drinks={drinks.edges.map((item) => item.node.frontmatter)}
        imageMap={imageMap}
      />
    </DrinkListLayout>
  );
}

export const pageQuery = graphql`
  query DrinksByTag($tag: String!, $contentPath: String!) {
    drinks: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { path: ASC } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            path
            date(formatString: "DD MMM YYYY")
            glass
            image {
              url
              alt
              align
            }
          }
        }
      }
    }
    content: markdownRemark(frontmatter: { path: { eq: $contentPath } }) {
      html
    }
    images: allFile(
      filter: {
        relativePath: { regex: "/^drinks//" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 130, quality: 80)
          }
        }
      }
    }
  }
`;

export const Head = ({ pageContext }) => {
  return <Meta title={`Drinks Tagged ${pageContext.tag}`} />;
};
