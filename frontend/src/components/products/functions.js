export const roundReviews = (reviews) => {
  const decPlaces = Math.pow(10, 1);
  // Enumerate reviews abbreviations
  const abbreviations = ["k", "m", "b", "t"];
  for (let i = abbreviations.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    let size = Math.pow(10, (i + 1) * 3);
    if (size <= reviews) {
      reviews = Math.round((reviews * decPlaces) / size) / decPlaces;
      if (reviews === 1000 && i < abbreviations.length - 1) {
        reviews = 1;
        i++;
      }
      reviews += abbreviations[i];
      break;
    }
  }
  return reviews;
};
