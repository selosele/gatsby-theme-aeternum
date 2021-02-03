import React from "react"
import Image from "./image"

const siteConfig = require("../../config")

const Profile = ({ file, alt, name }) => {
  file = siteConfig.author.avatar

  return (
    <aside className="body__profile">
      {file &&
        <div className="body__profile__image">
          <Image filename={file} alt={alt} />
        </div>
      }
      <div className="body__profile__name">
        <p><strong>{name}</strong></p>
      </div>
    </aside>
  )
}

export default Profile