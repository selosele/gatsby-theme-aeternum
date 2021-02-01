import React from "react"
import { graphql, Link } from "gatsby"

const PostLink = ({ post }) => {
  const urlTitle = "title-" + post.frontmatter.slug.replace(/\//g, "").replace(/-/g, "")
  const postTime = post.frontmatter.date.replace(/년 /, "-").replace(/월 /, "-").replace(/일/, "")

  return (
    <>
    <li>
      <article aria-labelledby={urlTitle} className="post-list__item">
        <p className="post-list__item-date">
          <time dateTime={postTime}>{post.frontmatter.date}</time>
        </p>

        <h2 className="post-list__item-title" id={urlTitle}>
          <Link to={post.frontmatter.slug} rel="permalink">
            {post.frontmatter.title}
          </Link>
        </h2>
      </article>
    </li>
    </>
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
            subtitle
          }
        }
      }
    }
  }
`