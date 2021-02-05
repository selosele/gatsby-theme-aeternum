import React from "react"
import { graphql, Link } from "gatsby"

const PostLink = ({ post }) => {
  const urlTitle = "title-" + post.frontmatter.slug.replace(/\//g, "").replace(/-/g, "")
  const postTime = post.frontmatter.date.replace(/년 /, "-").replace(/월 /, "-").replace(/일/, "")

  return (
    <li>
      <article aria-labelledby={urlTitle} className="post-list__item">
        {post.frontmatter.image && 
          <span 
            aria-hidden="true" 
            className="post-list__item-image" 
            style={{ backgroundImage: `url(https://twemoji.maxcdn.com/v/12.1.2/svg/${post.frontmatter.image}.svg)` }}>
          </span>
        }

        <h2 className="post-list__item-title" id={urlTitle}>
          <Link to={post.frontmatter.slug} rel="permalink">
            {post.frontmatter.title}
          </Link>
        </h2>

        <p className="post-list__item-labels">
          <span className="post-list__item-date">
            <time dateTime={postTime}>{post.frontmatter.date}</time>
          </span>

          {post.frontmatter.categories && 
            <>
            {post.frontmatter.categories.map((category, index) => <span key={index} className="post-list__item-category">{category}</span>)}
            </>
          }

          {post.frontmatter.tags && 
            <>
            {post.frontmatter.tags.map((tag, index) => <span key={index} className="post-list__item-tag">#{tag}</span>)}
            </>
          }
        </p>
      </article>
    </li>
  );
};

export default PostLink

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일")
            slug
            title
            image
            categories
            tags
          }
        }
      }
    }
  }
`