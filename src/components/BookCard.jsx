import { useState } from 'react';

export default function BookCard({ book, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(book._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-sm">☆</span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-sm">☆</span>
      );
    }
    
    return stars;
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const averageRating = book.averageRating || 0;
  const reviewCount = book.reviewCount || 0;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:border-indigo-300 hover:-translate-y-2 overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Book spine decoration */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header section */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            {/* Book icon and title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
                    {book.title}
                  </h2>
                </div>
              </div>
              
              {/* Author */}
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-600 font-medium text-sm sm:text-base truncate">
                  {book.author}
                </p>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${
                isDeleting 
                  ? 'text-red-400 bg-red-50 cursor-not-allowed' 
                  : 'text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 hover:scale-105'
              }`}
              title={isDeleting ? 'Deleting...' : 'Delete book'}
            >
              {isDeleting ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {showFullDescription ? book.description : truncateDescription(book.description)}
            </p>
            {book.description.length > 120 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-1 transition-colors duration-200"
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {/* Rating and stats section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
          {/* Rating display */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {renderStars(averageRating)}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-semibold text-gray-700">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>

          {/* Additional info or actions */}
          <div className="flex items-center space-x-2">
            {book.genre && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {book.genre}
              </span>
            )}
            {book.publishedYear && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {book.publishedYear}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-20 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-100 to-pink-100 opacity-20 rounded-full translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}