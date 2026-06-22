import { useState } from 'react';

const usePagination = (items = [], itemsPerPage = 24) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => {
    const p = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(p);
  };

  return {
    currentPage,
    setCurrentPage: goToPage,
    totalPages,
    currentItems,
  };
};

export default usePagination;
