/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get';

import Header from "./header"
import SideHome from "./side-home"

import "./common.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMdx {
        group(field: { frontmatter: { tags_be: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
      locale(language: {eq: "be"}) {
        data
      }
    }
  `)

  const footer = (
    <div className="page-footer">
      <div className="page-footer-content">
        <ul>
          <li>
            <a href="/rss.xml">RSS</a>
          </li>
          <li>
            <a
              href="https://twitter.com/Alxblsk"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter
            </a>
          </li>
          <li>
            <a href="https://belski.dev" target="_blank" rel="noopener noreferrer">
              belski.dev
            </a>
          </li>
        </ul>
        <small>© 2015-{new Date().getFullYear()} Аляксей Бельскі</small>
      </div>
    </div>
  );

  const translations = JSON.parse(get(data, "locale.data", null));

  return (
    <div className="page-container">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div className="page-content">
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              className: `page-content-inner ${child.props.className}`
            })
          }
        )}
          <SideHome categories={{ tags: data.allMdx.group, title: translations["blog.side.categories.title"] }} />
        </div>
      {footer}
    </div>
  )
}

export default Layout
