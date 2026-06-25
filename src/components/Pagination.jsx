import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return <div className="pagination">{pages}</div>;
};

export default Pagination;
