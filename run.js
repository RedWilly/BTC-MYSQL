const childProcess = require('child_process');
const execFile = require('child_process').execFile;

let attempts = 0;
const MAX_ATTEMPTS = 64;
const INTERVAL = 20000;

function runImport() {
  execFile('node', ['import.js'], (error, stdout, stderr) => {
    if (error && attempts < MAX_ATTEMPTS) {
      console.error(`Error occurred: ${error.message}`);
      console.error(stderr);
      attempts++;
      setTimeout(runImport, INTERVAL);
    } else {
      console.log('import.js finished running');
    }
  });
}

runImport();
