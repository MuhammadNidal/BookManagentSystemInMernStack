import React from "react";
import { Link } from "react-router-dom";

const BooksCard = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book._id} className="border rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold">{book.title}</h2>
          <p className="text-gray-500">Author: {book.author}</p>
          <p className="text-gray-500">Published: {book.publishYear}</p>
          <div className="mt-4">
            <Link to={`/books/edit/${book._id}`} className="text-blue-500 hover:text-blue-700">
              Edit
            </Link>
            <span className="mx-2">|</span>
            <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:text-red-700">
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
