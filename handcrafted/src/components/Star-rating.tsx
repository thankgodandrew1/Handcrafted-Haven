import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios'; 

export function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRatingClick = (selectedRating: any) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    try {
     
      await axios.post('/api/review', {
        rating: rating,
        comment: comment
      
      });

      setRating(null);
      setComment('');

      setSuccessMessage('Review submitted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); 
    } catch (error) {
      
      console.error('Error submitting review:', error);
      
    }
  };

  return (
    <div className="block p-4">
      <div className="mb-4">
        {[...Array(5)].map((star, index) => {
          const currentState = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rate"
                className="hidden"
                value={currentState}
                onClick={() => handleRatingClick(currentState)}
              />
              <FaStar
                size={20}
                className="inline cursor-pointer"
                color={currentState <= (hover || rating) ? "#71797E" : "#e4e5e9"}
                onMouseEnter={() => setHover(currentState)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
        <p className="inline"> {rating} ratings</p>
      </div>

      <textarea
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <button
        onClick={handleSubmitReview}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        disabled={!rating || !comment} 
      >
        Submit Review
      </button>

      {successMessage && (
        <p className="text-green-600 mt-2">{successMessage}</p>
      )}
    </div>
  );
}