import * as React from "react"
import { graphql } from "gatsby"
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Layout from "../components/layout"
import Seo from "../components/seo"
import Section from '../components/section'

import './index.scss';

const IS_TIMELINE_FOR_YEARS = 5;

function isTimelinePost({ node }) {
  const currentDate = new Date();
  const date = new Date(get(node, 'frontmatter.date'));
  return (
    currentDate.getFullYear() - date.getFullYear() <= IS_TIMELINE_FOR_YEARS
  );
}

function getPostsSorted(posts = []) {
  posts.sort((a, b) => {
    return new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date);
  })

  return posts.reduce(
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
        <Helmet title={siteTitle} htmlAttributes={{ lang: 'be' }}>
          <link rel="canonical" href={`${siteUrl}/`}></link>
          <meta name="robots" content="all" />
        </Helmet>
        <Section
          posts={sortedPosts.timeline}
          sectionTitle={translations["blog.home.timeline"]}
          theme="detailed"
        />
        <Section posts={sortedPosts.archive} sectionTitle={translations["blog.home.archive"]} theme="archive"/>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = (props) => {
  const translations = JSON.parse(get(props, "data.locale.data", null));
  return <Seo title={translations["blog.home.title"]} />
}

export default IndexPage

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
      siteUrl
      description
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
          tags_be
        }
      }
    }
  }
  locale(language: {eq: "be"}) {
    data
  }
}
`;
