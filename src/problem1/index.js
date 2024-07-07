// Simple loop
const sum_to_n_a = (n) => {
  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
};

// Using Array.from and reduce
const sum_to_n_b = (n) => {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc + val, 0);
};

// Math
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

