import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: '', comment: '' });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [profileUser, setProfileUser] = useState({});
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reviews/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setReviews(res.data.reviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      {console.log('Profile data:', res.data);}
      setProfileUser(res.data);
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  };

  fetchProfile();

  if (user?.role === 'user') {
    fetchReviews();
  }
}, [user]);


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

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setForm({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/reviews/${editingReviewId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEditingReviewId(null);
      setForm({ rating: '', comment: '' });
      fetchReviews();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">👤 {profileUser?.name}'s Profile</h1>
      <p className="text-gray-600 mb-2">Email: {profileUser?.email}</p>
      <p className="text-sm text-gray-500 mb-6">Role: {profileUser?.role}</p>
      {profileUser?.role === 'admin' ? (
        <div className="bg-yellow-50 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📘 Admin Access</h2>
          <p className="text-gray-700 mb-4">
            You are an administrator. Use the dashboard to manage books and content.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Admin Dashboard
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">You haven't posted any reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white p-4 rounded shadow">
                  {editingReviewId === review._id ? (
                    <form onSubmit={handleUpdate}>
                      <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={(e) =>
                          setForm({ ...form, rating: e.target.value })
                        }
                        min={1}
                        max={5}
                        className="w-full mb-2 px-3 py-2 border rounded"
                        placeholder="Rating (1–5)"
                        required
                      />
                      <textarea
                        name="comment"
                        value={form.comment}
                        onChange={(e) =>
                          setForm({ ...form, comment: e.target.value })
                        }
                        className="w-full mb-2 px-3 py-2 border rounded"
                        placeholder="Comment"
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingReviewId(null);
                            setForm({ rating: '', comment: '' });
                          }}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">
                        {review.book?.title || 'Untitled Book'} —{' '}
                        <span className="text-yellow-600">{review.rating}⭐</span>
                      </h3>
                      <p className="text-gray-800 mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-400 mb-2">
                        Posted on {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <div className="space-x-4 text-sm">
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
