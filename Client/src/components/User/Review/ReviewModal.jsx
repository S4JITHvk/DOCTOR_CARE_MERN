import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { addreview, fetchreview } from "../../../Services/User/userService";
import "./ReviewModal.css";

Modal.setAppElement("#root");

function ReviewModal({ isOpen, onClose, doctor }) {
  const User = useSelector((state) => state.user);
  const [reviewText, setReviewText] = useState("");
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchreviewofdoc();
    return () => {
      setReview([]);
    };
  }, [doctor?._id]);
  const fetchreviewofdoc = async () => {
    const response = await fetchreview(doctor?._id);
    if (response?.status === 200) {
      setReview(response.data);
    }
  };
  const handleReviewInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = async () => {
    const response = await addreview(reviewText, User.user?._id, doctor._id);
    if (response.status === 200) {
      fetchreviewofdoc();
      toast.success("Review Submitted");
      setReviewText("");
    }
  };
  const Sortedreview = review.reviews?.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Review Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      {doctor && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                src={doctor.profile || "/assets/doc.png"}
                alt="Doctor Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-blue-800">
                  DR {doctor.name}
                </h2>
                <p className="text-gray-700">EXPERTISE: {doctor.expertise}</p>
                <p className="text-gray-500">
                  EXPERIENCE: {doctor.experience_years} years
                </p>
                <p className="text-gray-500">GENDER: {doctor.gender}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <GrClose size={24} />
            </button>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2 border-r">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                Add Review
              </h3>
              <div className="flex items-center mb-4">
                <img
                  src={User.user?.profile || "/assets/user.png"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <textarea
                  value={reviewText}
                  onChange={handleReviewInputChange}
                  className="w-full h-24 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  placeholder="Add your review here..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleReviewSubmit}
                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${
                    reviewText.trim() === ""
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={reviewText.trim() === ""}
                >
                  Submit
                </button>
              </div>
            </div>
            <div
              className="w-1/2 pl-2 overflow-y-auto"
              style={{ maxHeight: "300px" }}
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                View Reviews
              </h3>
              <div className="space-y-4">
                {Sortedreview?.length > 0 ? (
                  Sortedreview.map((review) => (
                    <div
                      key={review._id}
                      className="flex items-start space-x-2"
                    >
                      <img
                        src={review.userId.profile || "/assets/user.png"}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.userId.name}</p>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ReviewModal;
