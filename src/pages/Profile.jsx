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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/my`, {
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // {console.log('Profile data:', res.data);}
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
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
        `${import.meta.env.VITE_API_URL}/reviews/${editingReviewId}`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-3xl sm:text-4xl text-white">👤</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {profileUser?.name}'s Profile
                </h1>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-100">
                    <span className="text-lg">📧</span>
                    <span className="text-sm sm:text-base">{profileUser?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🏷️</span>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      profileUser?.role === 'admin' 
                        ? 'bg-yellow-400 text-yellow-900' 
                        : 'bg-green-400 text-green-900'
                    }`}>
                      {profileUser?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {profileUser?.role === 'admin' ? (
          /* Admin Section */
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                📘 Admin Access
              </h2>
              <p className="text-yellow-100 mt-2">
                You have administrator privileges
              </p>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    You are an administrator. Use the dashboard to manage books and content.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-200"
                >
                  🚀 Go to Admin Dashboard
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* User Reviews Section */
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                📝 Your Reviews
                <span className="ml-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  {reviews.length}
                </span>
              </h2>
              <p className="text-indigo-100 mt-2">
                Manage and edit your book reviews
              </p>
            </div>
            
            <div className="p-6 sm:p-8">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">No Reviews Yet</h3>
                  <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
                    You haven't posted any reviews yet. Start exploring books and share your thoughts!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                      {editingReviewId === review._id ? (
                        /* Edit Form */
                        <div className="p-6">
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                            <h3 className="text-lg font-semibold text-blue-800 mb-1">
                              ✏️ Editing Review for "{review.book?.title || 'Untitled Book'}"
                            </h3>
                          </div>
                          
                          <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                              </label>
                              <select
                                name="rating"
                                value={form.rating}
                                onChange={(e) =>
                                  setForm({ ...form, rating: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                required
                              >
                                <option value="">Select a rating</option>
                                <option value="1">⭐ 1 - Poor</option>
                                <option value="2">⭐⭐ 2 - Fair</option>
                                <option value="3">⭐⭐⭐ 3 - Good</option>
                                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comment
                              </label>
                              <textarea
                                name="comment"
                                value={form.comment}
                                onChange={(e) =>
                                  setForm({ ...form, comment: e.target.value })
                                }
                                rows="4"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                                placeholder="Share your thoughts about this book..."
                                required
                              />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                              >
                                💾 Update Review
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReviewId(null);
                                  setForm({ rating: '', comment: '' });
                                }}
                                className="sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        /* Review Display */
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                                📖 {review.book?.title || 'Untitled Book'}
                              </h3>
                              
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="flex text-yellow-400 text-lg">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                      ⭐
                                    </span>
                                  ))}
                                </div>
                                <span className="text-lg font-bold text-gray-800">
                                  {review.rating}/5
                                </span>
                              </div>
                              
                              <p className="text-gray-700 text-base leading-relaxed mb-4">
                                {review.comment}
                              </p>
                              
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>📅</span>
                                <span>Posted on {new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                              <button
                                onClick={() => handleEdit(review)}
                                className="flex-1 sm:flex-none bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-center"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDelete(review._id)}
                                className="flex-1 sm:flex-none bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-center"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}