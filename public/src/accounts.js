function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1:-1)
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    const filteredTxns = book.borrows.filter(txn => txn.id === account.id)
    total+= filteredTxns.length
    return total
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  const filtered = books.filter(book => book.borrows[0].returned === false && book.borrows[0].id === account.id)
  
  return filtered.reduce((possessedBooks, book) => {
    const authorInfo = authors.find(author => author.id === book.authorId)
    possessedBooks.push({
      ...book,
      author: authorInfo,
    })
    return possessedBooks
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
