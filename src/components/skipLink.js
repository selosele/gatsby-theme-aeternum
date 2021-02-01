import React from "react"

const SkipLinks = () => {
	return (
		<nav aria-labelledby="skip-links-title" className="skip-links">
			<strong id="skip-links-title" className="sr-only">반복 영역 건너뛰기</strong>
			<a href="#contents" className="sr-only">본문 바로가기</a>
		</nav>
	)
}

export default SkipLinks