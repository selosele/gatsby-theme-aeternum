import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const siteConfig = require("../../config")
const MenuItems = siteConfig.menuItems

const ListLink = props => (<div role="menuitem" className="menu__list-item"><Link to={props.to}>{props.children}</Link></div>)

const Menu = ({ siteTitle }) => {
  const MenuItemList = MenuItems.map((item, index) => <ListLink key={index} to={item.path}>{item.title}</ListLink>)

  return (
    <>
      <nav id="menu" className="menu">
        <div className="menu__inner">
          <Link
            to="/"
            className="site-title"
          >
            {siteTitle}
          </Link>

          <div role="menu" tabIndex="0" className="menu__list">
            {MenuItemList}
          </div>
        </div>
      </nav>
    </>
  );
};

Menu.propTypes = {
  siteTitle: PropTypes.string
}

Menu.defaultProps = {
  siteTitle: ``
}

export default Menu