const isPrime = require('./main');
const assert = require('assert');
const AssertionError = require('assert').AssertionError;
try {assert.equal(isPrime(27), false);
assert.equal(isPrime(2), true);
assert.equal(isPrime(1), false); } catch (e) {
        if (e instanceof AssertionError) {
          console.log("Function  isPrime assertion error (expected : " + e.expected +", actual : " + e.actual + ")");
        }else if(e instanceof ReferenceError){
          console.log(e.name + " : " +  e.message);
        } else {
         console.log(e);
        }}