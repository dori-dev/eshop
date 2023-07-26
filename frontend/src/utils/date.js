export const formatDate = (date, full) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // Note: Months are zero-indexed, so we add 1
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  // Format the date in a human-readable way
  const formattedDate = `${year}/${month < 10 ? "0" + month : month}/${
    day < 10 ? "0" + day : day
  }`;
  return full ? `${formattedDate} ${hours}:${minutes}` : formattedDate;
};
