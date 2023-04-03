import * as React from "react"
import { graphql } from "gatsby"
import get from 'lodash/get';

import Layout from "../components/layout"
import Seo from "../components/seo"

import './404.scss';

const NotFoundPage = (props) => {
  const translations = JSON.parse(get(props, "data.locale.data", null));

  return (
    <Layout>
      <div className="not-found-wrapper">
        <h1>{translations["blog.404.title"]}</h1>
        <p>{translations["blog.404.description"]}</p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery {
    locale(language: {eq: "be"}) {
      data
    }
  }
`;