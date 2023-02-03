const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');
const mysql = require('mysql');

const verbose = 0; // set to 1 to enable logging, 0 to disable

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Password3@',
  database: 'btc500'
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL');

  const keyPair = bitcoin.ECPair.makeRandom();
  const publicKey = keyPair.publicKey;
  const address = bitcoin.payments.p2pkh({ pubkey: publicKey }).address;
  const uncompressedAddress = bitcoin.payments.p2pkh({ pubkey: publicKey, compressed: false }).address;
  const privateKey = keyPair.toWIF();

  if (verbose) {
    console.log(`Generated address: ${address}`);
    console.log(`Uncompressed address: ${uncompressedAddress}`);
    console.log(`Private key: ${privateKey}`);
  }

  connection.query(`SELECT * FROM btc500 WHERE address = '${address}'`, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      console.log(`Matched address: ${address}`);
      fs.appendFile('Jackpot.txt', `Address: ${address}, Private key: ${privateKey}\n`, (error) => {
        if (error) throw error;
      });
    }
  });

  connection.end();
});
