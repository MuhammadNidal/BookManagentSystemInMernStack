import React from "react";
import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Author</th>
          <th className="border px-4 py-2">Publish Year</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td className="border px-4 py-2">{book.title}</td>
            <td className="border px-4 py-2">{book.author}</td>
            <td className="border px-4 py-2">{book.publishYear}</td>
            <td className="border px-4 py-2">
              <Link to={`/books/edit/${book._id}`} className="text-blue-500 hover:text-blue-700">
                Edit
              </Link>
              <span className="mx-2">|</span>
              <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:text-red-700">
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
