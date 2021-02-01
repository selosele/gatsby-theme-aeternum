import React from "react"

const Footer = () => {
  return (
    <footer className="mastfoot">
      <p>&copy; {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer nofollow">Gatsby</a> and theme by <a href="https://github.com/selosele" target="_blank" rel="noopener noreferrer nofollow">Sel</a>.</p>
    </footer>
  )
}

export default Footer