import React from "react"
import PropTypes from "prop-types"

import { useStaticQuery, graphql } from "gatsby"

import SkipLink from "./skipLink"
import Menu from "./menu"
import SearchResult from "./SearchResult"
import Profile from "./profile"
import Footer from "./footer"

import "../css/style.scss"

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <>
      <SkipLink />

      <Menu 
        siteTitle={data.site.siteMetadata?.title || `Title`} 
      />

      <div className="body__wrapper">
        <main id="contents" className="body__contents">
          <section>
            {props.children}
          </section>
          
          <SearchResult />
        </main>

        <Profile 
          alt={data.site.siteMetadata?.author || `Author`} 
          name={data.site.siteMetadata?.author || `Author`} 
        />

        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout