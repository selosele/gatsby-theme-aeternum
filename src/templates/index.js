import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PaginationLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const IndexPage = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { frontmatter } = allMarkdownRemark

  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : 'page' + (index - 1).toString()
  const nextUrl = 'page' + (index + 1).toString()

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="page-title sr-only">최근 포스트</h1>

      <ul className="post-list">
        {group.map(({ node }) => (
          <li key={node.id}>
            <article aria-labelledby={"TITLE-" + node.id} className="post-list__item">
              {node.frontmatter.image && 
                <span 
                  aria-hidden="true" 
                  className="post-list__item-image" 
                  style={{ backgroundImage: `url(https://twemoji.maxcdn.com/v/12.1.2/svg/${node.frontmatter.image}.svg)` }}>
                </span>
              }
      
              <h2 id={"TITLE-" + node.id} className="post-list__item-title">
                <Link to={node.frontmatter.slug} rel="permalink">
                  {node.frontmatter.title}
                </Link>
              </h2>
      
              <p className="post-list__item-labels">
                <span className="post-list__item-date">
                  <time 
                    dateTime={node.frontmatter.date.replace(/년 /, "-").replace(/월 /, "-").replace(/일/, "")}
                  >
                  {node.frontmatter.date}
                  </time>
                </span>
      
                {node.frontmatter.categories && 
                  <>
                  {node.frontmatter.categories.map((category, index) => <span key={index} className="post-list__item-category">{category}</span>)}
                  </>
                }
      
                {node.frontmatter.tags && 
                  <>
                  {node.frontmatter.tags.map((tag, index) => <span key={index} className="post-list__item-tag">{"#" + tag}</span>)}
                  </>
                }
              </p>
            </article>
          </li>
        ))}
      </ul>

      <nav className="pagination">
        <div className="pagination__link pagination__link--prev">
          <PaginationLink test={first} url={previousUrl} text="이전" />
        </div>

        <div className="pagination__link pagination__link--next">
          <PaginationLink test={last} url={nextUrl} text="다음" />
        </div>
      </nav>
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
            slug
            date(formatString: "YYYY년 MM월 DD일")
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