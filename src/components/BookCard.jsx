export default function BookCard({ book, onDelete }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-500 text-sm">{book.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-yellow-600">
          Avg. Rating: {book.averageRating || 0}
        </span>
        <button
          onClick={() => onDelete(book._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

