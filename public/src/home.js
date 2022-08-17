function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => book.borrows[0].returned === false).length;
}

function getMostCommonGenres(books) {
  const mostCommonGenres = books.reduce((genres,book) => {
    const genreObj = genres.find(currGenre => currGenre.name === book.genre);
    
    !genreObj ? genres.push({
      name: book.genre,
      count:1,
    }) : genreObj.count++;
    return genres;
  }, []);
  mostCommonGenres.sort((genA, genB) => genB.count - genA.count);
  mostCommonGenres.splice(5);
  return mostCommonGenres;
}

function getMostPopularBooks(books) {
  const mostPopBooks = books.reduce((popularB, book) => {
    popularB.push({
      name: book.title,
      count: book.borrows.length 
    })
    return popularB
  }, [])
  mostPopBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  mostPopBooks.splice(5);
  return mostPopBooks;
}

function getMostPopularAuthors(books, authors) {
  const mostPopAuthors = authors.reduce((popAuthors, author) => {
    const filteredBooks = books.filter(book => book.authorId === author.id)
    const reducedBooks = filteredBooks.reduce((total, book) => {
      total+=book.borrows.length
      return total
    },0)
    popAuthors.push({
      name: `${author.name.first} ${author.name.last}`,
      count: reducedBooks
    })
    return popAuthors
  },[])
  mostPopAuthors.sort((authA, authB) => authB.count - authA.count);
  mostPopAuthors.splice(5);
  return mostPopAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
