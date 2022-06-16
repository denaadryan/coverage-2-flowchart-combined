const isPrime = require('./main');
const assert = require('assert');
const AssertionError = require('assert').AssertionError;
try {isPrime(3); } catch (e) {
        if (e instanceof AssertionError) {
          console.log("Function  isPrime assertion error (expected : " + e.expected +", actual : " + e.actual + ")");
        }else if(e instanceof ReferenceError){
          console.log(e.name + " : " +  e.message);
        } else {
         console.log(e);
        }}