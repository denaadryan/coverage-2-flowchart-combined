const { exec } = require('child_process');
const path = '"E:/ngoding/Tugas Akhir/coverage-2-flowchart-express/run.bat"';

function runCoverage() {
  exec(path, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
