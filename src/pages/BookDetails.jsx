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
      const res = await axios.get(`http://localhost:3000/api/books/${id}`);
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
        await axios.put(`http://localhost:3000/api/reviews/${editing}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post(`http://localhost:3000/api/reviews/${id}`, form, {
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
      await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchDetails();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  if (!book) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      <p className="text-yellow-600 mb-6">Average Rating: {book.averageRating || 0} ⭐</p>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Review' : 'Add Review'}</h2>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          min={1}
          max={5}
          className="w-full mb-3 px-4 py-2 border rounded"
          placeholder="Rating (1–5)"
          required
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          placeholder="Write your thoughts..."
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          {editing ? 'Update Review' : 'Submit Review'}
        </button>
      </form>

      {/* Book Reviews */}
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {book.reviews?.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        book.reviews.map((r) => (
          <ReviewCard
            key={r._id}
            review={r}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
