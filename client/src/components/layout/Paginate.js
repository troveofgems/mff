import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Paginate = ({pages = 1, page = 1, keyword = "", changePageContents}) => {
  console.log('Do we have a keyword? ', keyword);

  const handleRequestToGetNextSetOfResults = pageRequested => {
    console.log("Get Page", pageRequested);
    return changePageContents(pageRequested);
  };

  return pages > 1 && (
    <Pagination className={"justify-content-center pb-2 mb-0"}>
      {[...Array(pages).keys()].map(pageProps => (
        <Link key={pageProps + 1} to={/*keyword ? `/search/${keyword}/page/${pageProps + 1}` : `/page/${pageProps + 1}`*/"#"}
          style={{padding: "0 5px"}}
        >
          <Pagination.Item active={(pageProps + 1) === page} onClick={() => handleRequestToGetNextSetOfResults(pageProps + 1)}>
            {pageProps + 1}
          </Pagination.Item>
        </Link>
      ))}
    </Pagination>
  );
};

export default Paginate;