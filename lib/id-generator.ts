export const randomGenerator = (length = 6) =>
  Math.random()
    .toString(36)
    .substring(2, length + 2);
