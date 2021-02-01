import React from "react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

export default function PostView({ data }){
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  
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
        </header>
        
        <article dangerouslySetInnerHTML={{ __html: html }} className="post__contents"></article>
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
      }
    }
  }
`