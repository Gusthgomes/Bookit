"use client";

import {
  useCanUserReviewQuery,
  usePostReviewMutation,
} from "@/redux/api/roomApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NewReview = ({ roomId }: { roomId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const { data: { canReview } = {} } = useCanUserReviewQuery(roomId);
  const [postReview, { error, isSuccess }] = usePostReviewMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      toast.success("Reciew posted!");
      router.refresh();
    }
  }, [error, isSuccess]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId,
    };

    postReview(reviewData);
  };

  return (
    <>
      {canReview && (
        <button
          type="button"
          className="btn form-btn mt-4 mb-5"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Submit Your Review
        </button>
      )}

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  id="rating"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </p>
            </div>
            <div className="form-floating">
              <textarea
                id="review_field"
                className="form-control mt-4 px-1"
                style={{
                  height: "100%",
                  width: "90%",
                  margin: "auto",
                  marginBottom: "1rem",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <label htmlFor="review_field">Comment</label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn my-3 form-btn w-100"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
