const data = require('./utils/data.json');
let count = 0;

function recursiveCount(array) {
  array.forEach((value) => {
    count += 1;
    if (value.children) recursiveCount(Object.values(value.children))
  })
  return count;
}

console.log(recursiveCount(Object.values(data)));
