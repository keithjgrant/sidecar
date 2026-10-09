import React from 'react';
import IndexLayout from '../app/components/layouts/IndexLayout';
import Meta from '../app/components/Meta';
import { BrowserHeading } from '../app/components/PageHeading';
import IngredientsList from '../app/components/IngredientsList';

export default function IngredientsPage() {
  return (
    <IndexLayout title="Ingredients">
      <BrowserHeading bleed>
        Ingredients: Spirits, Syrups, & Mixers
      </BrowserHeading>
      <IngredientsList />
    </IndexLayout>
  );
}

// export const pageQuery = graphql`
//   query AllIngredients {
//     ingredients: allMarkdownRemark(
//       filter: { frontmatter: { path: { regex: "/^/ingredients//" } } }
//       sort: { order: DESC, fields: [frontmatter___path] }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             path
//             date(formatString: "MMMM DD, YYYY")
//             glass
//             image {
//               url
//               alt
//               align
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const Head = () => (
  <Meta title="Ingredients: Spirits, Syrups, & Mixers" />
);
