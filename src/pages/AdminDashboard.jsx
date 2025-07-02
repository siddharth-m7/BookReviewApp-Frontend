import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import axios from 'axios';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/books`, form);
      setForm({ title: '', author: '', description: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl text-white">📚</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your book collection with ease. Add new books and organize your library.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Add Book Form */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  ✨ Add New Book
                </h2>
                <p className="text-emerald-100 mt-2">
                  Fill in the details below to add a new book to your collection
                </p>
              </div>
              
              <form onSubmit={handleAddBook} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📖 Book Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter the book title..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ✍️ Author Name
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Enter the author's name..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write a brief description of the book..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-emerald-200 ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Adding Book...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Add Book to Library</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Book Collection */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                      📚 Book Collection
                    </h2>
                    <p className="text-blue-100 mt-2">
                      {loading ? 'Loading...' : `${books.length} books in your library`}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-semibold text-lg">
                        {books.length} Total
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                    <p className="text-lg font-medium text-gray-600">Loading your library...</p>
                  </div>
                ) : books.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">📚</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Library is Empty</h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                      Start building your collection by adding your first book using the form on the left.
                    </p>
                    <div className="inline-flex items-center space-x-2 text-blue-600 font-medium">
                      <span>👈</span>
                      <span>Add your first book to get started</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {books.map((book) => (
                      <div key={book._id} className="transform hover:scale-105 transition-all duration-200">
                        <BookCard book={book} onDelete={handleDelete} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {books.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Books</p>
                  <p className="text-3xl font-bold">{books.length}</p>
                </div>
                <div className="text-4xl opacity-80">📚</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Authors</p>
                  <p className="text-3xl font-bold">
                    {new Set(books.map(book => book.author)).size}
                  </p>
                </div>
                <div className="text-4xl opacity-80">✍️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Average Rating</p>
                  <p className="text-3xl font-bold">
                    {books.length > 0 
                      ? (books.reduce((acc, book) => acc + (book.averageRating || 0), 0) / books.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                </div>
                <div className="text-4xl opacity-80">⭐</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}