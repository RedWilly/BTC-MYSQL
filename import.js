const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

const CHUNK_SIZE = 1000000; // 1 MB
const WAIT_TIME = 60000; // 60 seconds

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Password3@',
  database: 'btc500'
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL');

  fs.readdir(__dirname, (error, files) => {
    if (error) throw error;

    const txtFiles = files.filter((file) => path.extname(file) === '.txt');
    let index = 0;

    function importFile() {
      if (index >= txtFiles.length) {
        console.log('Finished importing all data');
        connection.end();
        return;
      }

      console.log(`Now importing ${txtFiles[index]}`);
      const fileStream = fs.createReadStream(txtFiles[index]);
      let chunk = '';

      fileStream.on('data', (data) => {
        chunk += data.toString();

        while (chunk.length > CHUNK_SIZE) {
          const chunkEndIndex = chunk.indexOf('\n', CHUNK_SIZE);
          const chunkToImport = chunk.substring(0, chunkEndIndex);
          chunk = chunk.substring(chunkEndIndex + 1);

          importChunk(chunkToImport);
        }
      });

      fileStream.on('end', () => {
        importChunk(chunk);
        console.log(`Finished importing ${txtFiles[index]}`);
        fs.unlink(txtFiles[index], (error) => {
          if (error) throw error;
          console.log(`Deleted ${txtFiles[index]}`);
        });
        index++;
        setTimeout(importFile, WAIT_TIME);
      });
    }

    function importChunk(chunk) {
      const lines = chunk.toString().split('\n');

      lines.forEach((line) => {
        connection.query(`INSERT INTO btc500 (address, private_key) VALUES ('${line.split(',')[0]}', '${line.split(',')[1]}')`, (error, result) => {
          if (error) throw error;
        });
      });
      chunk = ''; // clear chunk for new file
    }

    importFile();
  });
});
