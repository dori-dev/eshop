export const getErrorMessage = (error) => {
  const { data } = error.response;
  let result = Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === "object") {
        value = value.join(", ");
      }
      return key + ": " + value;
    })
    .join("\n");
  return result ? result : error.message;
};
