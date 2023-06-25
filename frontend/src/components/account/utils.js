export const override = {
  display: "block",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#111",
};

export const getQueries = (search) => {
  let query = {};
  search
    .slice(1)
    .split("&")
    .forEach((item) => {
      let [key, value] = item.split("=");
      query[key] = value;
    });
  return query;
};
