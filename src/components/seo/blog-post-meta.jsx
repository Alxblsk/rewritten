import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import { getBlogPostUrl, getBlogPostHero } from '../utils/meta';

export const BlogPostMeta = function ({ post, meta }) {
  const postSource = post.frontmatter;
  const { src: heroImage } = getBlogPostHero(postSource);
  const postUrl = getBlogPostUrl(meta.siteUrl, postSource);
  const postTitle = `${postSource.title} || ${meta.title}`;
  const postDescription = get(post, 'excerpt', '')  // Replace later with a custom description

  return (
    <Helmet
      title={postTitle}
      htmlAttributes={{ lang: 'be', prefix: 'og: http://ogp.me/ns#' }}
    >
      <meta name="description" content={postDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={`@${meta.username}`} />
      {heroImage && <meta name="twitter:image" content={heroImage} />}

      <meta property="og:title" content={postTitle} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      {heroImage && <meta property="og:image" content={heroImage} />}
      <meta property="og:description" content={postDescription} />
      <meta property="profile:first_name" content={meta.firstName} />
      <meta property="profile:last_name" content={meta.lastName} />
      <meta property="profile:username" content={meta.username} />

      <meta name="robots" content="all" />

      <link rel="canonical" href={postUrl}></link>
      <link rel="alternate" type="application/rss+xml" title={meta.title} href="/rss.xml" />
    </Helmet>
  )
}