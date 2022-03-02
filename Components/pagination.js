import { useState } from "react";

function usePagination(itemsPerPage, data) {
  const [currentPage, setCurrentPage] = useState(1);

  ///Returns the new List of Pokemons With the limit of 10
  function currentData() {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return data
      .sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      })
      .slice(firstIndex, lastIndex);
  }

  ///Changes the currentPage by adding 1
  function nextPage() {
    setCurrentPage(() => currentPage + 1);
  }

  ///Changes the currentPage by subtructing 1
  function prevPage() {
    setCurrentPage(() => currentPage - 1);
  }

  return { nextPage, prevPage, currentData, currentPage };
}

export default usePagination;
