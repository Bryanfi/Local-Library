function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(book => book.borrows[0].returned === false)
  const returned = books.filter(book => book.borrows[0].returned === true)
  
  return [checkedOut, returned]
}

//HELPER FUNCTION 
function _findAccount(accounts, id) {
  return accounts.find(account => account.id === id)
}

function getBorrowersForBook(book, accounts) {
  const accountsArr = book.borrows.reduce((arr, txn) => {
    const accountInfo = _findAccount(accounts, txn.id)
    arr.push({
      ...accountInfo,
      returned: txn.returned,
    })
    return arr
  }, [])
  accountsArr.splice(10)
  return accountsArr
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
