function isPrime(n) {
  let c = 0;
  let i = 1;
  while (i < n) {
    if (n % i == 0) {
      c++;
      if (c > 1) {
        return false;
      }
    }
    i++;
  }

  if (c == 1) {
    return true;
  }
  return false;
}
module.exports = isPrime;