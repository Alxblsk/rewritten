/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

import "./layout.css"
import "./common.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
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

  return (
    <div className="page-container">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="page-content">{children}</div>
      {footer}
    </div>
  )
}

export default Layout
