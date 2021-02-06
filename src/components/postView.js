import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

export default function PostView({ data, pageContext }){
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { previous, next } = pageContext
  
  const post = data.markdownRemark
  const postTime = frontmatter.date.replace(/년 /, "-").replace(/월 /, "-").replace(/일/, "")

  return (
    <Layout>
      <SEO 
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />
      <div className="post__contents">
        <header className="post__header">
          <h1 className="post__title">{frontmatter.title}</h1>
          
          {frontmatter.subtitle && 
            <p className="post__subtitle">
              <strong>{frontmatter.subtitle}</strong>
            </p>
          }

          <p className="post__date">
            <time dateTime={postTime}>{frontmatter.date}</time>
          </p>

          <p className="post__labels">
            {frontmatter.categories && 
              <>
              {frontmatter.categories.map((category, index) => <span key={index} className="post__labels__category">{category}</span>)}
              </>
            }

            {frontmatter.tags && 
              <>
              {frontmatter.tags.map((tag, index) => <span key={index} className="post__labels__tag">{"#" + tag}</span>)}
              </>
            }
          </p>
        </header>
        
        <article dangerouslySetInnerHTML={{ __html: html }} className="post__contents"></article>

        <nav className="post__pagination">
          {previous && (
            <Link to={previous.frontmatter.slug} rel="prev" className="post__pagination__link post__pagination__link--prev">
              &larr; {previous.frontmatter.title}
            </Link>
          )}

          {next && (
            <Link to={next.frontmatter.slug} rel="next" className="post__pagination__link post__pagination__link--next">
              {next.frontmatter.title} &rarr;
            </Link>
          )}
        </nav>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일")
        slug
        title
        subtitle
        description
        categories
        tags
      }
    }
  }
`