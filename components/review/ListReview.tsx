import { IReview } from "@/backend/models/Room";
import React from "react";

interface Props {
  reviews: IReview[];
}

const ListReview = ({ reviews }: Props) => {
  return (
    <div className="reviews w-75 mb-5">
      <h3>{reviews.length} Reviews</h3>
      <hr />

      {reviews?.map((review) => (
        <div className="review-card my-3">
          <div className="row">
            <div className="col-3 col-lg-1">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar?.url
                    : "/images/default_avatar.jpg"
                }
                alt={review?.user?.name}
                width={60}
                height={60}
                className="rounded-circle"
              />
            </div>
            <div className="col-9 col-lg-11">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review?.rating / 5) * 100}%` }}
                >
                  {review?.rating} stars
                </div>
              </div>
              <p className="review_user mt-1">by {review?.user?.name}</p>

              <p className="review_comment">{review?.comment}</p>
            </div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListReview;
