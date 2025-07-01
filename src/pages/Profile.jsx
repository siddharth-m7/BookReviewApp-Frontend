import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reviews/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchReviews();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">👤 {user?.name}'s Profile</h1>
      {console.log('User:', user)}

      <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven't posted any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">
                {review.book.title} <span className="text-sm text-gray-500">by {review.book.author}</span>
              </h3>
              <p className="text-yellow-600 mb-2">⭐ {review.rating} Rating</p>
              <p className="text-gray-800 mb-2">{review.comment}</p>
              <p className="text-xs text-gray-400">
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
