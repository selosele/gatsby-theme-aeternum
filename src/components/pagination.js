import React from "react"
import { Link } from "gatsby"

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage
}) => {
  // const prevClassName = cx({
  //   'pagination__prev-link': true,
  //   'pagination__prev-link--disable': !hasPrevPage
  // });

  // const nextClassName = cx({
  //   'pagination__next-link': true,
  //   'pagination__next-link--disable': !hasNextPage
  // });

  return (
    <div className="pagination">
      <Link rel="prev" to={hasPrevPage ? prevPagePath : '/'} className="pagination__link pagination__link--prev">이전</Link>
      <Link rel="next" to={hasNextPage ? nextPagePath : '/'} className="pagination__link pagination__link--next">다음</Link>
    </div>
  );
};

export default Pagination