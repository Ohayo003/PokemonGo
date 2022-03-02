import { useState } from "react";

function usePagination(itemsPerPage, data) {
  const [currentPage, setCurrentPage] = useState(1);

  ///Gets the maximum number of Pages from the list of Pokemon
  const maximumPage = Math.ceil(data.length / itemsPerPage);

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
    setCurrentPage(() => Math.min(currentPage + 1, maximumPage));
  }

  ///Changes the currentPage by subtructing 1
  function prevPage() {
    setCurrentPage(() => Math.min(currentPage - 1, maximumPage));
  }

  return { nextPage, prevPage, currentData, currentPage };
}

export default usePagination;
