const input = `1008713
13,x,x,41,x,x,x,x,x,x,x,x,x,467,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,353,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`;
const [time, schedules] = (([t, s]) => {
  return [parseInt(t), s.split(',')]
})(input.split('\n'));
const buses = schedules.filter(s => s !== 'x').map(s => parseInt(s));

const part1 = () => {
  const earliest = buses
    .map(b => [b * Math.ceil(time / b) - time, b])
    .sort((a, b) => a[0] - b[0])[0];
  return earliest[0] * earliest[1]
};

const findPairTimes = (aStart, b, bOffset, inc) => {
  for (let n = aStart; true; n += inc) {
    if ((n - bOffset) % b == 0) {
      return n;
    }
  }
};

const part2 = () => {
  const sortedBuses = buses.sort((a, b) => b-a);
  const lookup = buses.reduce((d, b) => {
    d[b] = schedules.indexOf(b.toString());
    return d;
  }, {})
  const first = sortedBuses[0], firstIndex = lookup[first];
  
  let i = 1, start = first, increment = first;
  while (i < sortedBuses.length) {
    const current = sortedBuses[i];
    start = findPairTimes(start, current, firstIndex - lookup[current], increment);
    increment *= current;
    i++;
  }
  return start - firstIndex;
};

console.log(part1());
console.log(part2());
