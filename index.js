const fs = require('fs');
const bitcore = require("bitcore-lib");
const Buffer = require("buffer").Buffer;
const mysql = require('mysql');

// Configuration for database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Password3@',
  database: 'btc500'
});

let jackpotAddresses = [];
let totalAddressesGenerated = 0;
let totalAddressesFound = 0;

// Set verbose option to true to display all logs
const verbose = false;

// Connect to database
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL');
});

// Function to generate and check Bitcoin addresses
const generateAddress = (value) => {
  const hash = bitcore.crypto.Hash.sha256(value);
  const bn = bitcore.crypto.BN.fromBuffer(hash);

  // Generate compressed private key and address
  const privateKey = new bitcore.PrivateKey(bn);
  const wif = privateKey.toWIF();
  const publicKey = new bitcore.PublicKey(privateKey);
  const compressedAddress = publicKey.toAddress().toString();

  // Generate uncompressed private key and address
  const privateKey2 = bitcore.PrivateKey.fromBuffer(hash);
  const wif2 = privateKey2.toWIF();
  const publicKey2 = new bitcore.PublicKey(privateKey2);
  const uncompressedAddress = publicKey2.toAddress().toString();

  // Check if addresses exist in the database
  console.log("Checking database for address");
  connection.query(`SELECT * FROM btc500 WHERE address in ('${compressedAddress}', '${uncompressedAddress}')`, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      results.forEach((result) => {
        if (!jackpotAddresses.includes(result.address)) {
          jackpotAddresses.push(result.address);
          totalAddressesFound++;

          // Save the matching address and private key to a file
          fs.appendFile('Jackpot.txt', `Address: ${result.address}, Private Key: ${result.private_key}\n`, (error) => {
            if (error) throw error;
          });
        }
      });
    }
  });

  totalAddressesGenerated++;

  // Display all logs if verbose option is set to true
  if (verbose) {
    console.log('Compressed');
    console.log('WIF: ' + wif);
    console.log('Address: ' + compressedAddress);
    console.log('');
    console.log('Uncompressed');
    console.log('WIF: ' + wif2);
    console.log('Address: ' + uncompressedAddress);
    console.log('');
  }
};

// Function to run the script for 11 hours and then pause for 1 hour
const run = () => {
  const startTime = new Date();
  while (new Date() - startTime < 11 * 60 * 60 * 1000) {
    generateAddress(new Buffer.from(Math.random().toString()));
}

console.log('Total addresses generated: ${totalAddressesGenerated}');
console.log('Total jackpot addresses found: ${totalAddressesFound}');
console.log('Pausing for 1 hour...');

setTimeout(() => {
console.log('Resuming...');
run();
}, 1 * 60 * 60 * 1000);
};

run();

// Start the script
console.log('Starting script...');
