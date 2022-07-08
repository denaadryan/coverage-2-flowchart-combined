function decimalToBinary(x) {
  let bin = 0;
  let rem = 0;
  let i = 1;
  let step = 1;
  while (x != 0) {
    rem = x % 2;

    x = parseInt(x / 2);
    bin = bin + rem * i;
    i = i * 10;
  }
  return bin;
}
module.exports = decimalToBinary;