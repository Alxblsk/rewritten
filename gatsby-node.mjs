/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import { resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  const blogPostTemplate = resolve('./src/templates/blog-post.js');

  try {
    const result = await graphql(
      `
    {
      allMdx(sort: {frontmatter: {date: DESC}}, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
              title
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
    `
    );
    if (result.errors) {
      throw Error(result.errors);
    }

  
    // Create blog posts pages.
    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: `${blogPostTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });
  } catch (ex) {
    console.error(ex);
  }
}

export function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
