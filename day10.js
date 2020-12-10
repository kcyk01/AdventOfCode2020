const input = `73
114
100
122
10
141
89
70
134
2
116
30
123
81
104
42
142
26
15
92
56
60
3
151
11
129
167
76
18
78
32
110
8
119
164
143
87
4
9
107
130
19
52
84
55
69
71
83
165
72
156
41
40
1
61
158
27
31
155
25
93
166
59
108
98
149
124
65
77
88
46
14
64
39
140
95
113
54
66
137
101
22
82
21
131
109
45
150
94
36
20
33
49
146
157
99
7
53
161
115
127
152
128`;
const adapters = input.split('\n').map(a => parseInt(a)).sort((a, b) => a - b);

const part1 = () => {
  const counts = adapters.reduce((d, a) => {
    d[a - d.prev]++;
    d.prev = a;
    return d;
  }, {1: 0, 2: 0, 3: 0, prev: 0});
  return counts[1] * (counts[3] + 1);
};

const findLongestChain = () => {
  return adapters
    .map((a, i) => {
      // Convert to array of deltas
      if (i === 0) {
        return a;
      }
      return a - adapters[i-1];
    })
    .reduce((d, a) => {
      // Keep track of longest chain of 1's
      if (a === 1) {
        d.current++;
      } else {
        if (d.current > d.longest) {
          d.longest = d.current;
        }
        d.current = 0;
      }
      return d;
    }, {current: 1, longest: 0}).longest;
};

const createTribonacciLookup = (numOfTerms) => {
  const terms = [0, 0, 1];
  let i = 3;
  while (i < numOfTerms + 3) {
    terms[i] = terms[i-1] + terms[i-2] + terms[i-3];
    i++;
  }
  // Return as a dictionary lookup for the the num of terms requested
  return terms.reduce((d, t, i) => {
    if (i >= 2) {
      d[i-1] = t;
    }
    return d;
  }, {});
};

const part2 = () => {
  const longestChain = findLongestChain();
  const tribonacciLookup = createTribonacciLookup(longestChain + 1);

  let i = 0,
      count = 1,
      chain = 2; // Start chain at 2 to include the starting 0 as part of the combinations
  while (i < adapters.length) {
    if (adapters[i+1] - adapters[i] === 1) {
      chain++;
    } else {
      count *= tribonacciLookup[chain]
      chain = 1;
    }
    i++;
  }
  return count;
};

console.log(part1());
console.log(part2());
