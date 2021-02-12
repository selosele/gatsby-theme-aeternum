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
      <div className="page__contents" itemScope itemType="https://schema.org/CreativeWork">
        <header className="page__header">
          <h1 className="page__title">{frontmatter.title}</h1>
          
          {frontmatter.subtitle && 
            <p className="page__subtitle">
              <strong>{frontmatter.subtitle}</strong>
            </p>
          }

          <p className="page__date">
            <time dateTime={postTime}>{frontmatter.date}</time>
          </p>

          <p className="page__labels">
            {frontmatter.categories && 
              <>
              {frontmatter.categories.map((category, index) => <a key={index} href="#" itemProp="keywords" rel="tag" className="page__labels__category">{category}</a>)}
              </>
            }

            {frontmatter.tags && 
              <>
              {frontmatter.tags.map((tag, index) => <a key={index} href="#" itemProp="keywords" rel="tag" className="page__labels__tag">{"#" + tag}</a>)}
              </>
            }
          </p>
        </header>
        
        <article dangerouslySetInnerHTML={{ __html: html }} className="page__body"></article>

        <nav className="post-pagination">
          {previous && (
            <Link to={previous.frontmatter.slug} rel="prev" className="post-pagination__link post-pagination__link--prev">
              &larr; {previous.frontmatter.title}
            </Link>
          )}

          {next && (
            <Link to={next.frontmatter.slug} rel="next" className="post-pagination__link post-pagination__link--next">
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