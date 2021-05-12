export const splitIntoPages = (data, pageSize = 10) => {
  const pages = data.reduce((acc, cv, index, arr) => {
    return {
      ...acc,
      [index + 1]: arr.splice(index, pageSize),
    };
  }, {});
  const totalPages = Object.keys(pages).length
  return { pages, totalPages };
};

export const filterUsers = (data, searchText, pageSize = 10) => {
  let temp = [...data];
  if(!searchText) {
    return splitIntoPages(data, pageSize)
  }
  let searchVal = searchText.toLowerCase()
  let filteredUsers = temp
    .filter(item => item.name.toLowerCase().includes(searchVal)||item.role.toLowerCase().includes(searchVal)||item.email.toLowerCase().includes(searchVal));
  return splitIntoPages(filteredUsers, pageSize);
}
