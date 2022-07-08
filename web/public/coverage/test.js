function factorial(number) {
  if (number < 0) {
    return null;
  }

  // if number is 0
  else if (number === 0) {
    return 1;
  }

  // if number is positive
  else {
    let fact = 1;
    let i = 1;
    do {
      fact *= i;
      i++;
    } while (i <= number);

    // console.log(`The factorial of ${number} is ${fact}.`);
    return fact;
  }
}
