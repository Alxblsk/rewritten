import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import get from 'lodash/get'
import Layout from "../components/layout"
//import { BlogPostMeta } from '../components/seo/blog-post-meta';
import { getBlogPostDate } from '../components/utils/meta';

import './blog-post.scss'

function BlogPostTemplate(props) {
  const { data, pageContext, children } = props
  const { previous, next, slug, frontmatter } = pageContext
  const post = data.mdx

  const siteMeta = get(data, 'site.siteMetadata', {})
  const { siteUrl, title } = siteMeta;

  let featuredImg = getImage(post.frontmatter.image?.childImageSharp?.gatsbyImageData)

  return (
    <Layout>
    <div className="blog-article">
      <div className="header">
        <h1 className="title">{frontmatter.title}</h1>
        <span className="date">{getBlogPostDate(frontmatter)}</span>
      </div>
      
      {featuredImg && <GatsbyImage image={featuredImg} />}

      <div className="post">{children}</div>

      {(previous || next) ? (
        <div className="related-articles">
          <h4 className="paginator-title">Далее</h4>
          <ul className="paginator">
            {previous && (
              <li>
                <Link to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                </Link>
              </li>
            )}
            <li>
              <Link to={'/'} rel="home">
                На главную
              </Link>
            </li>
          </ul>
        </div>
      ) : null
      }

      {/* <BlogPostMeta post={post} meta={siteMeta} /> */}
    </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 80)
      frontmatter {
        title
        date
        slug
        image {
          childImageSharp {
            gatsbyImageData(width: 640)
          }
        }
      }
    }
  }
`
