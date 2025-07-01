import { useAuth } from '../contexts/AuthContext';

export default function ReviewCard({ review, onEdit, onDelete }) {
  const { user } = useAuth();

  return (
    <div className="border p-4 rounded shadow bg-white mb-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Rating: {review.rating} ⭐</h3>
        {user && review.user === user.id && (
          <div className="text-sm space-x-2">
            <button onClick={() => onEdit(review)} className="text-blue-600">Edit</button>
            <button onClick={() => onDelete(review._id)} className="text-red-600">Delete</button>
          </div>
        )}
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}
