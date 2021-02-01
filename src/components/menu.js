import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import SearchInput from "./SearchInput"
import Footer from "./footer"

const MenuItems = [
	{
		path: "/",
		title: "Home"
	},
	{
		path: "/about",
		title: "About me"
	}
]

const ListLink = props => (<div role="menuitem" className="menu__list-item"><Link to={props.to}>{props.children}</Link></div>)

const Menu = ({ siteTitle }) => {
	const MenuItemList = MenuItems.map((item, index) => <ListLink key={index} to={item.path}>{item.title}</ListLink>);

	return (
		<>
			<nav id="side-menu" className="side-menu">
				<div>
          <Link
            to="/"
            className="site-title"
          >
            {siteTitle}
          </Link>

          <div role="menu" tabIndex="0" className="menu__list">
            {MenuItemList}
          </div>

          <SearchInput />
        </div>

				<Footer />
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