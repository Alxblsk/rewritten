import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import get from 'lodash/get';
import classNames from 'classnames';

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


import { getBlogPostDate } from '../components/utils/meta';

import './index.scss';

const IS_TIMELINE_FOR_YEARS = 5;

function isBelarusPost({ node }) {
  const tags = get(node, 'frontmatter.tags') || '';
  return tags.toLowerCase().includes('беларусь');
}

function isTimelinePost({ node }) {
  const currentDate = new Date();
  const date = new Date(get(node, 'frontmatter.date'));
  return (
    currentDate.getFullYear() - date.getFullYear() <= IS_TIMELINE_FOR_YEARS
  );
}

function getPostsSorted(posts = []) {
  const allPosts =  posts.reduce(
    (acc, post) => {
      if (isTimelinePost(post)) {
        acc.timeline.push(post);
        return acc;
      }

      acc.archive.push(post);
      return acc;
    },
    { belarus: [], timeline: [], archive: [] }
  );

  [allPosts.timeline, allPosts.belarus, allPosts.archive].forEach(group => {
    return group.sort((a, b) => {
      console.log('b', b);
      return new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date);
    })
  })

  return allPosts;
}

function Section({ posts, sectionTitle, theme }) {
  return (
    <div className={classNames('posts-section', theme)}>
      <h2 className="posts-section-title">{sectionTitle}</h2>
      <div className="post-feed">
        {posts.map((post) => {
          const {node} = post;
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          const src = get(
            node,
            'frontmatter.image.childImageSharp.resolutions.src',
            ''
          );
          const date = getBlogPostDate(node.frontmatter);
          return (
            <article key={node.fields.slug} className={classNames("post-card post", isBelarusPost(post) && 'tag-belarus')}>
              <div className="post-card-content">
                <Link to={node.fields.slug} className="post-card-content-link">
                  <header className="post-card-header">
                    <h3 className="post-card-title">{title}</h3>
                    <small className="post-card-date">{date}</small>
                  </header>
                  <section className="post-card-excerpt">
                    <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  </section>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const IndexPage = (props) => {
  const siteMeta = get(props, 'data.site.siteMetadata', {});
  const { title: siteTitle, siteUrl } = siteMeta;
  const posts = get(props, 'data.allMdx.edges');
  const translations = JSON.parse(get(props, "data.locale.data", null));
  const sortedPosts = getPostsSorted(posts);

  return (
    <Layout>
      <div className="home-template">
        <Section
          posts={sortedPosts.timeline}
          sectionTitle={translations["blog.home.timeline"]}
          theme="detailed"
        />
        <Section posts={sortedPosts.archive} sectionTitle={translations["blog.home.archive"]} />
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
      siteUrl
    }
  }
  allMdx(sort: {frontmatter: {date: DESC}}) {
    edges {
      node {
        excerpt(pruneLength: 280)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DDTHH:mm:ss.sssZ")
          title
          tags
        }
      }
    }
  }
  locale(language: {eq: "be"}) {
    data
  }
}
`;
