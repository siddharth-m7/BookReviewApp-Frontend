import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../contexts/AuthContext';

export default function BookDetails() {
  const { id } = useParams(); // id = bookId
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [form, setForm] = useState({ rating: '', comment: '' });
  const [editing, setEditing] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
      setBook(res.data); // Includes book info and reviews
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${editing}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/reviews/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      setForm({ rating: '', comment: '' });
      setEditing(null);
      fetchDetails();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const handleEdit = (review) => {
    setForm({ rating: review.rating, comment: review.comment });
    setEditing(review._id);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchDetails();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Book Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {book.title}
            </h1>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="text-2xl">⭐</span>
              <span className="text-white font-semibold text-lg">
                {book.averageRating || 0}
              </span>
              <span className="text-white/80 text-sm">
                ({book.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>
          
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 sm:px-8 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {editing ? '✏️ Edit Your Review' : '✍️ Share Your Thoughts'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="relative">
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white text-lg font-medium"
                    required
                  >
                    <option value="">Select a rating</option>
                    <option value="1">⭐ 1 - Poor</option>
                    <option value="2">⭐⭐ 2 - Fair</option>
                    <option value="3">⭐⭐⭐ 3 - Good</option>
                    <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                  placeholder="What did you think about this book? Share your insights..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-200"
                >
                  {editing ? '💾 Update Review' : '🚀 Submit Review'}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setForm({ rating: '', comment: '' });
                    }}
                    className="sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 sm:px-8 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              💬 Reader Reviews
              <span className="ml-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {book.reviews?.length || 0}
              </span>
            </h2>
          </div>
          
          <div className="p-6 sm:p-8">
            {book.reviews?.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-500 text-lg font-medium mb-2">No reviews yet</p>
                <p className="text-gray-400">Be the first to share your thoughts about this book!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {book.reviews.map((r) => (
                  <div key={r._id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex text-yellow-400 text-lg">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < r.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-lg font-bold text-gray-800">
                            {r.rating}/5
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                          {r.comment}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {r.user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{r.user.name}</span>
                        </div>
                      </div>

                      {/* Action buttons for review owner */}
                      {user?.id === r.user._id && (
                        <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                          <button
                            onClick={() => handleEdit(r)}
                            className="flex-1 sm:flex-none bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            className="flex-1 sm:flex-none bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}