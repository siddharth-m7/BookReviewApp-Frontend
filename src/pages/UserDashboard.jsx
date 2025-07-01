import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/books').then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Books 📚</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <Link to={`/books/${book._id}`} key={book._id}>
            <div className="p-4 border rounded shadow hover:bg-gray-100 bg-white">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-yellow-600">
                Avg Rating: {book.averageRating || 0}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
