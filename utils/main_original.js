function isPrime(n) {
  let c = 0;
  for (let i = 1; i < n; i++) {
    if (n % i == 0) {
      c++;
      if (c > 1) {
        return false;
      }
    }
  }
  if (c == 1) {
    return true;
  }
  return false;
}