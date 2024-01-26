import React from 'react';
import { graphql } from 'gatsby';
import CardLayout from '../components/layouts/CardLayout';
import Meta from '../components/Meta';
import DrinkCard from '../components/drink/DrinkCard';

const nbsp = '\u00A0';

export default function DrinkTemplate({ data }) {
  const drink = {
    ...data.post.frontmatter,
    content: data.post.html,
  };
  const slug = drink.path.replace('/drinks/', '');

  let photoCredit;
  if (drink.image && drink.image.photographer) {
    const name = drink.image.photographer.replace(' ', nbsp);
    photoCredit = (
      <span>
        Photo by{' '}
        {drink.image.creditUrl ? (
          <a href={drink.image.creditUrl}>{name}</a>
        ) : (
          name
        )}
      </span>
    );
  }

  return (
    <CardLayout drinkName={slug} footerContent={photoCredit}>
      <DrinkCard drink={drink} imageData={data.image} />
    </CardLayout>
  );
}

export const pageQuery = graphql`
  query DrinkPostByPath($filePath: String!, $imagePath: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $filePath } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        path
        glass
        sweetness
        booziness
        family
        ingredients
        garnish
        tags
        featured
        image {
          url
          alt
          align
          photographer
          creditUrl
        }
        intro
      }
    }
    image: file(relativePath: { eq: $imagePath }) {
      relativePath
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 290, quality: 85)
      }
    }
  }
`;

export const Head = ({ data }) => {
  const title = data?.post?.frontmatter?.title;
  const image = data.image ? `/images/${data.image.relativePath}` : null;
  return <Meta title={title} image={image} />;
};
