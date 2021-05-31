export const paginate = (array = [], pageSize = 10, pageNumber = 1) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const calculateTotalPages = (arr, pageSize) =>
  Math.ceil(arr.length / pageSize);

export const validateRowFields = (rowData = {}) => {
  let isValid = true;
  const errorKeys = [];
  let errMsg = "";
  const { id, ...fieldsToValidate } = rowData;
  Object.entries(fieldsToValidate).forEach(([key, value]) => {
    const isEmptyField = !value;
    const isInValidEmail = key === "email" && !/^\S+@\S+\.\S+$/.test(value);
    const isInValidRole =
      key === "role" && !["admin", "member"].includes(value.toLowerCase());
    const isInValidName = key === "name" && !/[a-zA-Z ]/.test(value);

    if (isEmptyField || isInValidEmail || isInValidRole || isInValidName) {
      errorKeys.push(key);
      isValid = false;
      return;
    }
  });

  errMsg = `
    Please Check: ${errorKeys.join(", ")} field(s).
    P.S: 
      Name cannot be empty, it can only contain aplhabets and spaces,
      Email cannot be invalid and Role can be either Member or Admin
  `;

  return { isValid, errorKeys, errMsg };
};
