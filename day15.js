const input = `0,8,15,2,12,1,4`;
const nums = input.split(',').map(n => parseInt(n));

const run = (iters) => {
  const lastPos = new Map();
  let i = 0, prevN = -1, currentN = 0;
  while (i < iters) {
    if (i < nums.length) {
      currentN = nums[i];
    } else if (lastPos.has(prevN)) {
      currentN = i - lastPos.get(prevN);
    } else {
      currentN = 0;
    }
    lastPos.set(prevN, i);
    prevN = currentN;
    i++;
  }
  return currentN;
};

const part1 = () => {
  return run(2020);
};

const part2 = () => {
  return run(30000000);
};

console.log(part1());
console.log(part2());
