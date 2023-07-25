export const getErrorMessage = (error) => {
  console.log(error);
  var result;
  try {
    const { data } = error.response;
    result = Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === "object") {
          value = value.join(", ");
        }
        return key + ": " + value;
      })
      .join("\n");
  } catch (error) {}
  return result ? result : error.message;
};
