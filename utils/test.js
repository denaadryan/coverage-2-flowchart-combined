const decimalToBinary = require('./main');
const assert = require('assert');
const AssertionError = require('assert').AssertionError;
try {assert.equal(decimalToBinary(0), 0);
 } catch (e) {
        if (e instanceof AssertionError) {
          console.log("Function  decimalToBinary assertion error (expected : " + e.expected +", actual : " + e.actual + ")");
        }else if(e instanceof ReferenceError){
          console.log(e.name + " : " +  e.message);
        } else {
         console.log(e);
        }}