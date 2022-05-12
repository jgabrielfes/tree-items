let count = 0;

function recursiveCount(object) {
  Object.values(object).forEach(({ children }) => {
    count += 1;
    if (children) recursiveCount(children);
  })
  return count;
}

export default recursiveCount;
