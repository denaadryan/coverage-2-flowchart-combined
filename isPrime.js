// bool IsPrime(long n)
// {
//     int c = 0;
//     for (long i = 1; i < n; i++)
//     {//loop up-till the number
//         if (n % i == 0)//check if its divisible by i
//         {
//             c++;
//             if (c > 1) { return false; }//short-circuit..
//         }   //^^if it has more than one divisor it can't be prime
//     }
//     if (c == 1)
//     {
//         return true;
//     }
//     return false;
// }

// function isPrime(n) {
//   let c = 0;
//   for (let i = 1; i < n; i++) {
//     if (n % i == 0) {
//       c++;
//       if (c > 1) {
//         console.log('out 1');
//       }
//     }
//   }
//   if (c == 1) {
//     console.log('out 2');
//   }
//   console.log('out 3');
// }

// console.log(isPrime(6));

// function test(x) {
//   if (x > 1) {
//     if (x == 7) {
//       return true;
//     }
//   }
//   return false;
// }

// console.log(test(6));

// function isPrime(n) {
//   let c = 0;
//   for (let i = 1; i < n; i++) {
//     if (n % i == 0) {
//       c++;
//       if (c > 1) {
//         return false;
//       }
//     }
//   }
//   if (c == 1) {
//     return true;
//   }
//   return false;
// }

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

assert.equal(isPrime(27), false);
assert.equal(isPrime(2), true);
assert.equal(isPrime(1), false);
