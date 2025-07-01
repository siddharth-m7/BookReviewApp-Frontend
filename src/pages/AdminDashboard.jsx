import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import axios from 'axios';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', description: '' });

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:3000/api/books');
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddBook = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/books', form);
    setForm({ title: '', author: '', description: '' });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard 📚</h1>

      {/* Add Book Form */}
      <form
        onSubmit={handleAddBook}
        className="bg-white p-4 rounded shadow mb-8 max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
