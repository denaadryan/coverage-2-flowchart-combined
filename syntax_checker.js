const vm = require('vm');
const fs = require('fs');

const original_path = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/web/utils.js';

const fileBuffer = fs.readFileSync(original_path, 'utf-8');

try {
  //   const script = new vm.Script('var a = "dodo"');
  const script = new vm.Script(fileBuffer);
  console.log('redirecting');
} catch (e) {
  console.log('ERROR : ' + e);
}
