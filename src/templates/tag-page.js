import React from 'react'
import startCase from 'lodash/startCase'
import { graphql } from 'gatsby'
import get from 'lodash/get';

import Layout from "../components/layout"
import Section from "../components/section"

import './tag-page.scss'

function TagPageTemplate({ pageContext, data}) {
  const {tag} = pageContext;
  const { allMdx, locale } = data;
  const { edges } = allMdx;
  const translations = JSON.parse(get(locale, "data", null));

  return (
    <Layout>
      <div className="tag-page">
        <div className="tag-page-content">
          <Section
            posts={edges}
            sectionTitle={`${translations["blog.tags.tag.title"]}: #${startCase(tag)}`}
            theme="tags"
          />
        </div>
      </div>
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        username
        firstName
        lastName
      }
    }
    allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { tags_be: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 280)
          frontmatter {
            date(formatString: "YYYY-MM-DDTHH:mm:ss.sssZ")
            title
          }
        }
      }
    }
    locale(language: {eq: "be"}) {
      data
    }
  }
`