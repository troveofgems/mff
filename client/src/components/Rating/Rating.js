import React from 'react';

const Rating = ({ starFillColor = '#006994', productRatingInfo: { productRating, productReviewCount } }) => {
  const _printStars = () => {
    let
      starLimit = 5,
      stars = [];

    for (let starCount = 0; starCount < starLimit; starCount += 1) {
      stars.push(
        <span key={`starId-${starCount}`}>
          <i
            style={{color: starFillColor}}
            className={productRating >= (starCount + 1) ?
              'fas fa-star'
              : productRating >= (starCount + 0.5) ?
                'fas fa-star-half-alt'
                : 'far fa-star'
            } />
        </span>
      );
    }

    return stars;
  };


  return (
    <div className={"rating"}>
      {_printStars()}
      {productReviewCount > 0 ? (
        <span style={{letterSpacing: ".15rem"}}> of {productReviewCount} reviews.</span>
      ) : (
        <span style={{letterSpacing: ".15rem"}}> - No Reviews</span>
      )}
    </div>
  );
};

export default Rating;
