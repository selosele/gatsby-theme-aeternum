import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostLink from "../components/postLink"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="page-title sr-only">최근 포스트</h1>
      <ul className="post-list">{Posts}</ul>
      <p className="post-count">총 {edges.length}개의 포스트</p>
    </Layout>
  );
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
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