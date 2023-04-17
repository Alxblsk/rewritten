import * as React from "react"
import get from 'lodash/get';
import classNames from 'classnames';
import { Link } from "gatsby"

import { getBlogPostDate } from '../components/utils/meta';

import './section.scss'

function isBelarusPost({ node }) {
  const tags = get(node, 'frontmatter.tags_be') || [];
  return tags.some(tag => tag.toLowerCase() === 'беларусь')
}

function Section({ posts, sectionTitle, theme }) {
    return (
      <div className={classNames('posts-section', theme)}>
        <h2 className="posts-section-title">{sectionTitle}</h2>
        <div className="post-feed">
          {posts.map((post) => {
            const {node} = post;
            const title = get(node, 'frontmatter.title') || node.fields.slug;
  
            return (
              <article key={node.fields.slug} className={classNames("post-card post", isBelarusPost(post) && 'tag-belarus')}>
                <div className="post-card-content">
                  <Link to={node.fields.slug} className="post-card-content-link">
                    <header className="post-card-header">
                      <h3 className="post-card-title">{title}</h3>
                      <small className="post-card-date">{getBlogPostDate(node.frontmatter)}</small>
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

  export default Section;